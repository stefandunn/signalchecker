import { selectedMarkerState } from "@/states/map";
import { FC, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Modal } from "../Modal/Modal";
import { ModalRefProps } from "../Modal/Modal.types";
import markerPopupStyle from "./MarkerPopup.module.scss";
import { DateTime } from "luxon";
import { Button } from "../Button/Button";

export const MarkerPopup: FC = () => {
  const [currentMarker, setCurrentMarker] = useRecoilState(selectedMarkerState);
  const modalRef = useRef<ModalRefProps | null>(null);

  useEffect(() => {
    if (currentMarker && modalRef.current) {
      modalRef.current.open();
    }
  }, [currentMarker]);

  if (currentMarker === null) {
    return null;
  }
  const date = DateTime.fromISO(currentMarker.createdAt.toString());

  return (
    <div className={markerPopupStyle.markupPopup}>
      <Modal
        ref={modalRef}
        title={`Result from ${date.toLocaleString(
          DateTime.DATE_MED_WITH_WEEKDAY
        )}`}
        onClose={() => {
          setCurrentMarker(null);
        }}
      >
        <table>
          <tbody>
            <tr>
              <td className="pr-3 font-bold">Network</td>
              <td>{currentMarker.network}</td>
            </tr>
            <tr>
              <td className="pr-3 font-bold">Device</td>
              <td className="truncate">{currentMarker.device}</td>
            </tr>
            <tr>
              <td className="pr-3 font-bold">Speed</td>
              <td>{currentMarker.speed}mbps</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4 text-center">
          <Button
            onClick={() => {
              modalRef.current?.close();
            }}
          >
            Back to Map
          </Button>
        </div>
      </Modal>
    </div>
  );
};
