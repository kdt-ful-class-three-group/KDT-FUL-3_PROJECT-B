// Input.tsx
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <div className="relative w-full">
      <input
        className={`w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        placeholder="정류장 이름 또는 버스 번호를 입력하세요"
        {...props}
      />
      <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};