import { useEffect, useState } from "react";
import { PopupProps, ArrivalInfo } from "./types";
import { Button } from "../common/Button";
import { FetchArrivalInfo } from "./FetchArrivalInfo"; 

export const Popup: React.FC<PopupProps> = ({ stop, buses, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  // 노선별 도착정보 상태
  const [arrivalInfos, setArrivalInfos] = useState<{ [routeId: string]: ArrivalInfo | undefined }>({});
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);

    // 노선별 도착정보를 모두 fetch
    async function fetchArrivals() {
      const infoMap: { [routeId: string]: ArrivalInfo | undefined } = {};
      
      // 각 노선에 대해 도착정보 fetch (순차 or 병렬 가능)
      await Promise.all(
      buses.map(async (bus) => {
        try {
          const infoList = await FetchArrivalInfo(stop.id, bus.routeId, stop.citycode);
          // infoList가 배열이 아닐 수도 있으니, 배열로 변환
          const arr = Array.isArray(infoList) ? infoList : [];
          // routeId를 문자열로 변환해서 비교
          const info = arr.find(
            (item) => String(item.routeId).trim() === String(bus.routeId).trim()
          );
          infoMap[bus.routeId] = info;
        } catch (e) {
          infoMap[bus.routeId] = undefined;
        }
      })
    );
      setArrivalInfos(infoMap);
    }

    fetchArrivals();

    return () => clearTimeout(timer);
  }, [buses, stop.id, stop.citycode]);

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
            {buses.map((bus) => {
              // 도착정보 가져오기
              const info = arrivalInfos[bus.routeId];
              console.log('도착정보 디버깅:', {
                routeId: bus.routeId,
                info,
                arrivalInfos,
                stopId: stop.id,
                cityCode: stop.citycode,
              });
              return (
                <li
                  key={bus.routeId}
                  className="p-3 bg-gray-100 rounded-lg shadow-sm text-base text-gray-800 cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">[{bus.routeTp}] {bus.routeNo}번</span>
                    <span className="text-sm text-gray-500">{bus.end} 방면</span>
                  </div>
                  <div className="text-sm text-gray-600">{bus.start} → {bus.end}</div>
                  {/* 버스 도착 정보 표시 */}
                  <div className="mt-1 text-sm text-green-700">
                    {info
                      ? (
                        <>
                          <span>
                            버스 도착 시간:&nbsp;
                            {info.message1 
                              ? info.message1 
                              : info.predictTime1
                                ? `${Math.round(Number(info.predictTime1) / 60)}분 후`
                                : '정보 없음'
                            }
                          </span>
                          {info.message2 && (
                            <span className="ml-2 text-gray-500">
                              / {info.message2}
                            </span>
                          )}
                        </>
                      )
                      : <span className="text-gray-400">버스 도착 정보 없음</span>
                    }
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};