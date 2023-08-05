"use client";
import { userLocationState } from "@/states/location";
import { ClassName } from "@/types/props";
import clsx from "clsx";
import mapbox from "mapbox-gl";

import { FC, useEffect, useRef } from "react";
import { useRecoilStateLoadable } from "recoil";
import { CiLocationOn } from "react-icons/ci";

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
  const mapElRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapbox.Map>();
  const mapMarkersRef = useRef<mapbox.Marker[]>([]);

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

    map.on("click", ({ lngLat: { lat, lng } }) =>
      setLocation({ latitude: lat, longitude: lng })
    );

    map.addControl(new mapbox.NavigationControl());

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [state, setLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }
    for (const marker of mapMarkersRef.current) {
      marker.remove();
    }
    const coords: mapbox.LngLatLike = [longitude, latitude];
    mapMarkersRef.current.push(
      new mapbox.Marker().setLngLat(coords).addTo(map)
    );
    map.flyTo({ center: coords, duration: 1000, essential: true });
  }, [latitude, longitude]);

  return (
    <div className={clsx(className, "h-screen relative")} ref={mapElRef}>
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
