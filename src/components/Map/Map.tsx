"use client";
import { userLocationState } from "@/states/location";
import { ClassName } from "@/types/props";
import clsx from "clsx";
import mapbox, { EventData, MapEventType } from "mapbox-gl";

import { FC, useCallback, useEffect, useRef } from "react";
import {
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { CiLocationOn } from "react-icons/ci";
import { mapBoundingBoxState, mapMarkersState } from "@/states/map";
import { LngLat } from "@/types/common";

mapbox.accessToken = process.env.NEXT_PUBLIC_MAP_API_KEY;

const mapOptions: Omit<mapbox.MapboxOptions, "container"> = {
  style: "mapbox://styles/mapbox/dark-v10",
  zoom: 15,
  attributionControl: false,
};

export const Map: FC<ClassName> = ({ className }) => {
  const [
    {
      state,
      contents: { longitude, latitude },
    },
    setLocation,
  ] = useRecoilStateLoadable(userLocationState);

  const { state: serverMarkersState, contents } =
    useRecoilValueLoadable(mapMarkersState);
  const setBoundingBox = useSetRecoilState(mapBoundingBoxState);
  const mapElRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapbox.Map>();
  const mapMarkersRef = useRef<mapbox.Marker[]>([]);
  const selectMapMarkerRef = useRef<mapbox.Marker>();

  const clearCurrentMarker = () => {
    selectMapMarkerRef.current?.remove();
  };

  const addCurrentMarker = useCallback((coords: mapbox.LngLatLike) => {
    clearCurrentMarker();
    const map = mapRef.current;
    if (!map) {
      return;
    }
    selectMapMarkerRef.current = new mapbox.Marker()
      .setLngLat(coords)
      .addTo(map);
    map.flyTo({ center: coords, duration: 1000, essential: true });
  }, []);

  const clearMarkers = useCallback(() => {
    for (const marker of mapMarkersRef.current) {
      marker.remove();
    }
  }, []);

  const addMarkers = useCallback((markers: mapbox.LngLatLike[]) => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    markers.forEach((coords) => {
      mapMarkersRef.current.push(
        new mapbox.Marker({ color: "#bdc3c7" }).setLngLat(coords).addTo(map)
      );
    });
  }, []);

  const handleMapClick = useCallback(
    ({ lngLat: { lat, lng } }: MapEventType["click"] & EventData) => {
      if (!mapRef.current) {
        return;
      }
      setLocation({ latitude: lat, longitude: lng });
    },
    [setLocation]
  );

  const handleMapMove = useCallback(
    (event: MapEventType["moveend"] & EventData) => {
      const { 0: sw, 1: ne } = event.target.getBounds().toArray();
      setBoundingBox({
        min: { lng: sw[0], lat: sw[1] },
        max: { lng: ne[0], lat: ne[1] },
      });
    },
    [setBoundingBox]
  );

  useEffect(() => {
    if (serverMarkersState === "loading") {
      clearMarkers();
    }
    if (serverMarkersState === "hasValue") {
      const longLats = contents as LngLat[];
      addMarkers(longLats);
    }
  }, [contents, serverMarkersState, clearMarkers, addMarkers]);

  useEffect(() => {
    const { current: domEl } = mapElRef;
    if (!domEl || state !== "hasValue") {
      return;
    }

    domEl.innerHTML = "";

    const map = new mapbox.Map({
      container: domEl,
      ...mapOptions,
    });

    map.on("click", handleMapClick);
    map.on("moveend", handleMapMove);

    map.addControl(new mapbox.NavigationControl());

    mapRef.current = map;

    return () => {
      map.off("click", handleMapClick);
      map.off("moveend", handleMapMove);
      map.remove();
    };
  }, [state, handleMapClick, handleMapMove]);

  useEffect(() => {
    if (longitude && latitude) {
      addCurrentMarker({ lng: longitude, lat: latitude });
    }
  }, [longitude, latitude, addCurrentMarker]);

  return (
    <div
      className={clsx(className, "h-full relative flex-grow")}
      ref={mapElRef}
    >
      <div className="absolute top-0 left-0 h-full w-full loading loading-dark flex items-center justify-center">
        <div className="text-white text-xl font-light text-center">
          <div>Obtaining your location</div>
          <div className="animate-bounce mt-5">
            <CiLocationOn className="inline-block text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
