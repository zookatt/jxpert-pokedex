import { usePokemonsByRegion } from "./hooks/usePokemonsByRegion";
import { useVisiblePokemons } from "./hooks/useVisiblePokemons";
import { usePokemonFeatures } from "./hooks/usePokemonFeatures";
import { PokemonGrid } from "./components/organisms/PokemonGrid";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";
import { PokemonFeatures } from "./components/organisms/PokemonFeatures";

export const App = () => {
  const {
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
  } = usePokemonFeatures();
  const { pokemons, isLoading } = usePokemonsByRegion(selectedRegion);

  const visiblePokemons = useVisiblePokemons(pokemons, search, selectedSort);

  return (
    <div className="layout">
      <Header />
      <main className="container">
        <PokemonFeatures
          search={search}
          selectedRegion={selectedRegion}
          selectedSort={selectedSort}
          isRegionOpen={isRegionOpen}
          isSortOpen={isSortOpen}
          onSearchChange={setSearch}
          onRegionToggle={handleRegionMenuToggle}
          onRegionSelect={handleRegionSelect}
          onSortToggle={handleSortMenuToggle}
          onSortSelect={handleSortSelect}
        />

        <PokemonGrid pokemons={visiblePokemons} isLoading={isLoading} />

        {!isLoading && visiblePokemons.length === 0 && (
          <p className="nopokemons">No pokemons for "{search}"</p>
        )}
      </main>
      <Footer />
    </div>
  );
};
