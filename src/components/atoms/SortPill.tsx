import type { SortOption } from "../../utils/pokemonSort";

interface SortPillProps {
  value: SortOption;
  label: string;
  shortLabel: string;
  selectedValue: SortOption;
  onSelect: (value: SortOption) => void;
}

export function SortPill({
  value,
  label,
  shortLabel,
  selectedValue,
  onSelect,
}: SortPillProps) {
  const isSelected = selectedValue === value;

  const handleSelect = () => {
    onSelect(value);
  };

  return (
    <button
      type="button"
      role="radio"
      aria-label={label}
      className={`sort__pill ${isSelected ? "active" : ""}`}
      aria-checked={isSelected}
      onClick={handleSelect}
    >
      {shortLabel}
    </button>
  );
}
