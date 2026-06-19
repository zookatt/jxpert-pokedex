import { SortPill } from "../atoms/SortPill";
import { SORT_OPTIONS } from "../../constants/options";
import type { SortOption } from "../../utils/pokemonSort";

interface SortMenuProps {
  selectedSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
}

export function SortMenu({ selectedSort, onSelectSort }: SortMenuProps) {
  return (
    <article className="sort__wrapper">
      <h3 className="sort__title">Sort by</h3>

      <div
        className="sort__items"
        role="radiogroup"
        id="sort-list"
        aria-label="Sort by"
      >
        {SORT_OPTIONS.map((option) => (
          <SortPill
            key={option.value}
            value={option.value}
            label={option.label}
            shortLabel={option.shortLabel}
            selectedValue={selectedSort}
            onSelect={onSelectSort}
          />
        ))}
      </div>
    </article>
  );
}
