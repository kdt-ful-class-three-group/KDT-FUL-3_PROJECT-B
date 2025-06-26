import { Input } from "../common/Input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <Input
      placeholder="버스 번호 또는 정류장명을 입력하세요"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};