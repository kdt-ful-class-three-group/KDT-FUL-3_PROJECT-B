import { useRef, useState, useEffect } from "react";
import { ReactNode } from "react";

type Props = {
  children: (show: boolean, setShow: (val: boolean) => void, ref: React.RefObject<HTMLDivElement | null>) => ReactNode;
};

export const SearchWrapper = ({ children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return children(showResults, setShowResults, containerRef);
};