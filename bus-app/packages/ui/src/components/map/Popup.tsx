import { useEffect, useState } from "react";
import { PopupProps } from "./types";
import { Button } from "../common/Button";

export const Popup: React.FC<PopupProps> = ({ stop, buses, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full max-w-md mx-auto h-[70%] bg-gray-100 shadow-lg rounded-t-xl p-4 transition-transform duration-300 z-50
    ${isVisible ? 'translate-y-0' : 'translate-y-full'}
  `}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">
          {stop.name}
          {buses.length > 0 && (
            <span className="text-sm text-gray-500 ml-2">({buses[0].end} 방면)</span>
          )}
        </h2>
        <Button onClick={onClose} className="text-gray-500 hover:text-black" aria-label="닫기">
          &times;
        </Button>
      </div>

      <div className="flex-1 overflow-hidden h-full">
        <div className="overflow-y-auto pr-1 h-full max-h-full scrollbar-hide">
          <ul className="space-y-2">
            {buses.map((bus) => (
              <li
                key={bus.routeId}
                className="p-3 bg-gray-100 rounded-lg shadow-sm text-base text-gray-800 cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={() => console.log(`버스 클릭이벤트 추가하면됨 ${bus.routeNo}`)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">[{bus.routeTp}] {bus.routeNo}번</span>
                  <span className="text-sm text-gray-500">{bus.end} 방면</span>
                </div>
                <div className="text-sm text-gray-600">{bus.start} → {bus.end}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
