import { useState } from "react";
import { SortOption } from "./utils/pokemonSort";
import { RegionName } from "./constants/regions";
import { usePokemonsByRegion } from "./hooks/usePokemonsByRegion";
import { useVisiblePokemons } from "./hooks/useVisiblePokemons";
import { PokemonGrid } from "./components/organisms/PokemonGrid";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { PokemonFeatures } from "./components/organisms/PokemonFeatures";

export const App = () => {
  const [findPokemons, setFindPokemons] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<RegionName>("kanto");
  const [isRegionVisible, setIsRegionVisible] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>("default");
  const { pokemons, isLoading } = usePokemonsByRegion(selectedRegion);

  const visiblePokemons = useVisiblePokemons(
    pokemons,
    findPokemons,
    selectedSort,
  );

  const selectSort = (sort: SortOption) => {
    setSelectedSort(sort);
    setIsSortMenuOpen(false);
  };

  const toggleRegionMenu = () => {
    setIsRegionVisible((isVisible) => !isVisible);
    setIsSortMenuOpen(false);
  };

  const selectRegion = (region: RegionName) => {
    setSelectedRegion(region);
    setIsRegionVisible(false);
  };

  const toggleSortMenu = () => {
    setIsSortMenuOpen((isOpen) => !isOpen);
    setIsRegionVisible(false);
  };

  return (
    <div className="layout">
      <Header />
      
      <main className="container">
        <PokemonFeatures
          search={findPokemons}
          selectedRegion={selectedRegion}
          selectedSort={selectedSort}
          isRegionOpen={isRegionVisible}
          isSortOpen={isSortMenuOpen}
          onSearchChange={setFindPokemons}
          onRegionToggle={toggleRegionMenu}
          onRegionSelect={selectRegion}
          onSortToggle={toggleSortMenu}
          onSortSelect={selectSort}
        />

        <PokemonGrid pokemons={visiblePokemons} isLoading={isLoading} />

        {!isLoading && visiblePokemons.length === 0 && (
          <p className="nopokemons">No pokemons for "{findPokemons}"</p>
        )}
      </main>

      <Footer />
    </div>
  );
};
