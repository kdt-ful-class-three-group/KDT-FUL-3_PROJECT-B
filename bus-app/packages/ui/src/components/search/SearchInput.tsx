// 검색 input 컴포넌트
import { Input } from "../common/Input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <Input
      value={value}
      placeholder="정류장 이름을 입력하세요"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};