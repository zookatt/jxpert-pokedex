import { useState } from "react";
import { type SortOption } from "./utils/pokemonSort";
import pokeball from "./assets/pokeball.svg";
import { REGION_OPTIONS, type RegionName } from "./constants/regions";
import { usePokemonsByRegion } from "./hooks/usePokemonsByRegion";
import { useVisiblePokemons } from "./hooks/useVisiblePokemons";
import { PokemonGrid } from "./components/organisms/PokemonGrid";
import { SortMenu } from "./components/molecules/SortMenu";
import { SearchBar } from "./components/molecules/SearchBar";

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
          <div className="dropdown">
            <button
              role="combobox"
              aria-haspopup="listbox"
              aria-controls="regions-list"
              aria-label="Select regions"
              aria-expanded={isRegionVisible}
              className={`dropdown__button ${isRegionVisible ? "active" : ""}`}
              onClick={() =>
                setIsRegionVisible((prev) => {
                  if (isSortMenuOpen) {
                    setIsSortMenuOpen(false);
                  }
                  return !prev;
                })
              }
            >
              {selectedRegion}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 10L8.00004 12.6667L5.33337 10"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ol
              role="listbox"
              id="regions-list"
              hidden={!isRegionVisible}
              className={`dropdown__list ${!isRegionVisible ? "hide" : ""}`}
            >
              {REGION_OPTIONS.map((key) => (
                <li
                  key={key}
                  role="radio"
                  aria-checked={selectedRegion === key}
                  tabIndex={0}
                  className={selectedRegion === key ? "active" : ""}
                  onClick={() => {
                    setSelectedRegion(key);
                    setIsRegionVisible(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSelectedRegion(key);
                      setIsRegionVisible(false);
                    }
                  }}
                >
                  {key}
                </li>
              ))}
            </ol>
          </div>

          <button
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-list"
            aria-label="Sort by"
            aria-expanded={isSortMenuOpen}
            className="sort__button"
            onClick={() =>
              setIsSortMenuOpen((prev) => {
                if (isRegionVisible) setIsRegionVisible(false);
                return !prev;
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                isSortMenuOpen
                  ? "var(--color-accent)"
                  : "var(--color-neutral-700)"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </svg>
          </button>

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
