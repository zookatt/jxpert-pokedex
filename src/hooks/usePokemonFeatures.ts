import { useState } from "react";
import type { RegionName } from "../constants/regions";
import type { SortOption } from "../utils/pokemonSort";

export function usePokemonFeatures() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<RegionName>("kanto");
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>("default");

  const handleSortSelect = (sort: SortOption) => {
    setSelectedSort(sort);
    setIsSortOpen(false);
  };

  const handleRegionMenuToggle = () => {
    setIsRegionOpen((isOpen) => !isOpen);
    setIsSortOpen(false);
  };

  const handleRegionSelect = (region: RegionName) => {
    setSelectedRegion(region);
    setIsRegionOpen(false);
  };

  const handleSortMenuToggle = () => {
    setIsSortOpen((isOpen) => !isOpen);
    setIsRegionOpen(false);
  };

  return {
    search,
    selectedRegion,
    selectedSort,
    isRegionOpen,
    isSortOpen,
    setSearch,
    handleRegionMenuToggle,
    handleRegionSelect,
    handleSortMenuToggle,
    handleSortSelect,
  };
}