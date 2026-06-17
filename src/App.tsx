import { useState } from "react";
import { SortOption } from "./utils/pokemonSort";
import pokeball from "./assets/pokeball.svg";
import { RegionName } from "./constants/regions";
import { usePokemonsByRegion } from "./hooks/usePokemonsByRegion";
import { useVisiblePokemons } from "./hooks/useVisiblePokemons";
import { PokemonGrid } from "./components/organisms/PokemonGrid";
import { SortMenu } from "./components/molecules/SortMenu";
import { SearchBar } from "./components/molecules/SearchBar";
import { RegionDropdown } from "./components/molecules/RegionDropdown";
import { SortButton } from "./components/atoms/SortButton";

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
      <header className="header">
        <img src={pokeball} alt="" className="header__logo" />
        <p className="header__title">Pokédex</p>
      </header>

      {/* Searcher */}
      <main className="container">
        <section className="search">
          <SearchBar value={findPokemons} onChange={setFindPokemons} />
          {/* Shows regions */}
          <RegionDropdown
            selectedRegion={selectedRegion}
            isOpen={isRegionVisible}
            onToggle={toggleRegionMenu}
            onSelectRegion={selectRegion}
          />

          <SortButton isOpen={isSortMenuOpen} onClick={toggleSortMenu} />

          {/* Muestra el menú de ordenación */}
          {isSortMenuOpen && (
            <SortMenu selectedSort={selectedSort} onSelectSort={selectSort} />
          )}
        </section>

        {/* Muestra cartas cargando */}
        <section>
          <PokemonGrid pokemons={visiblePokemons} isLoading={isLoading} />
        </section>
        {!isLoading && visiblePokemons.length === 0 && (
          <p className="nopokemons">No pokemons for "{findPokemons}"</p>
        )}
      </main>

      <footer className="footer">
        <p>
          ©{new Date().getFullYear()} Pokémon. ©1995 -{" "}
          {new Date().getFullYear()} Nintendo/Creatures Inc./GAME FREAK inc. TM,
          ®Nintendo.
        </p>
      </footer>
    </div>
  );
};
