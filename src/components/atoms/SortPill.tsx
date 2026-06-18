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
    <span
      role="radio"
      aria-label={label}
      tabIndex={0}
      className={`sort__pill ${isSelected ? "active" : ""}`}
      aria-checked={isSelected}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          handleSelect();
        }
      }}
    >
      {shortLabel}
    </span>
  );
}
