import { selectedMarkerState } from "@/states/map";
import { FC, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Modal } from "../Modal/Modal";
import { ModalRefProps } from "../Modal/Modal.types";
import markerPopupStyle from "./MarkerPopup.module.scss";
import { DateTime } from "luxon";
import { Button } from "../Button/Button";
import { colourFromSpeed } from "@/utils/helpers";

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
        title="Speed Test Result"
        onClose={() => {
          setCurrentMarker(null);
        }}
      >
        <div>
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                <td className="pr-3 font-bold">Network</td>
                <td>{currentMarker.network}</td>
              </tr>
              <tr>
                <td className="pr-3 font-bold">Device</td>
                <td>
                  <span className="truncate block">{currentMarker.device}</span>
                </td>
              </tr>
              <tr>
                <td className="pr-3 font-bold">Speed</td>
                <td>
                  {currentMarker.speed}mbps
                  <span
                    className="inline-block ml-3 h-4 w-4 animate-pulse rounded-full"
                    style={{
                      backgroundColor: colourFromSpeed(currentMarker.speed),
                      verticalAlign: "middle",
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <small>
              <strong>Submitted on: </strong>
              {date.toLocaleString(DateTime.DATETIME_FULL)}
            </small>
          </div>
          <div className="mt-4 text-center">
            <Button
              onClick={() => {
                modalRef.current?.close();
              }}
            >
              Back to Map
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
