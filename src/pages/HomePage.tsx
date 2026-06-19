import { useFavoritePokemons } from "../hooks/useFavoritePokemons";
import { usePokemonFeatures } from "../hooks/usePokemonFeatures";
import { usePokemonsByRegion } from "../hooks/usePokemonsByRegion";
import { useVisiblePokemons } from "../hooks/useVisiblePokemons";
import { PokemonFeatures } from "../components/organisms/PokemonFeatures";
import { PokemonGrid } from "../components/organisms/PokemonGrid";

export function HomePage() {
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

  const { pokemons, isLoading, error } = usePokemonsByRegion(selectedRegion);
  const visiblePokemons = useVisiblePokemons(pokemons, search, selectedSort);
  const { toggleFavorite, isFavorite } = useFavoritePokemons();

  return (
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

      <PokemonGrid
        pokemons={visiblePokemons}
        isLoading={isLoading}
        isFavoritePokemon={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      {error && !isLoading && <p className="nopokemons">{error}</p>}

      {!error && !isLoading && visiblePokemons.length === 0 && (
        <p className="nopokemons">No pokemons for "{search}"</p>
      )}
    </main>
  );
}