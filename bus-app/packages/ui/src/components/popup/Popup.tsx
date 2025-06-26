import { useEffect, useState } from "react";
import { PopupProps } from "./Popup.types";
import { PopupView } from "./PopupView";

export const Popup: React.FC<PopupProps> = ({ stop, buses, onClose }) => {
  // 팝업 표시 상태
  const [isVisible, setIsVisible] = useState(false);


  // 초기 렌더링 후 10ms 지연 후 팝업 표시
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // 팝업이 닫힐 때 애니메이션 후 onClose 호출
  useEffect(() => {
    if (isVisible) return;
  
    const timer = setTimeout(() => {
      onClose();
    }, 300);
  
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  // 팝업이 닫힐 때 애니메이션을 위해 stop 상태를 유지
  return (
    <PopupView
      isVisible={isVisible}
      stop={stop}
      buses={buses}
      onCloseButtonClick={() => setIsVisible(false)}
    />
  );
};