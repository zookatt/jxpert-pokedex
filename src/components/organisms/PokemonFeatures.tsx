import { SortButton } from "../atoms/SortButton";
import { RegionDropdown } from "../molecules/RegionDropdown";
import { SearchBar } from "../molecules/SearchBar";
import { SortMenu } from "../molecules/SortMenu";
import type { RegionName } from "../../constants/regions";
import type { SortOption } from "../../utils/pokemonSort";

interface PokemonFeaturesProps {
  search: string;
  selectedRegion: RegionName;
  selectedSort: SortOption;
  isRegionOpen: boolean;
  isSortOpen: boolean;
  onSearchChange: (value: string) => void;
  onRegionToggle: () => void;
  onRegionSelect: (region: RegionName) => void;
  onSortToggle: () => void;
  onSortSelect: (sort: SortOption) => void;
}

export function PokemonFeatures({
  search,
  selectedRegion,
  selectedSort,
  isRegionOpen,
  isSortOpen,
  onSearchChange,
  onRegionToggle,
  onRegionSelect,
  onSortToggle,
  onSortSelect,
}: PokemonFeaturesProps) {
  return (
    <section className="search">
      <SearchBar value={search} onChange={onSearchChange} />

      <RegionDropdown
        selectedRegion={selectedRegion}
        isOpen={isRegionOpen}
        onToggle={onRegionToggle}
        onSelectRegion={onRegionSelect}
      />

      <SortButton isOpen={isSortOpen} onClick={onSortToggle} />

      {isSortOpen && (
        <SortMenu selectedSort={selectedSort} onSelectSort={onSortSelect} />
      )}
    </section>
  );
}
