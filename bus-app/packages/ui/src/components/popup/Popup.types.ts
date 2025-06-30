export interface BusRoute {
  routeId: string;
  routeNo: string;
  routeTp: string;
  start: string;
  end: string;
}

export interface PopupProps {
  stop: {
    name: string;
  };
  buses: BusRoute[];
  onClose: () => void;
}

export interface PopupViewProps extends Pick<PopupProps, 'stop' | 'buses'> {
  isVisible: boolean;
  onCloseButtonClick: () => void;
}