import { useEffect } from 'react';
import type { Stop } from './Map.types';

export function usePopupClose(
  mapRef: React.RefObject<HTMLDivElement | null>,
  selectedStop: Stop | null,
  onClose: () => void
) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!mapRef.current) return;

      const target = event.target as Node;
      if (target instanceof HTMLElement && target.closest('.custom-popup')) {
        return;
      }

      if (selectedStop && mapRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [selectedStop]);
}