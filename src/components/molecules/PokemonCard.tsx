import type { CSSProperties } from "react";
import { TypeIcon } from "../atoms/TypeIcon";
import { PokemonStats } from "./PokemonStats";
import { FavoriteButton } from "../atoms/FavoriteButton";
import type { PokemonCardData } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: PokemonCardData;
  isFavorite: boolean;
  onToggleFavorite: (pokemon: PokemonCardData) => void;
}

export function PokemonCard({
  pokemon,
  isFavorite,
  onToggleFavorite,
}: PokemonCardProps) {
  const primaryType = pokemon.types[0] ?? "normal";
  const secondaryType = pokemon.types[1];

  const customStyles = {
    "--color-type": `var(--color-${primaryType})`,
  } as CSSProperties;

  return (
    <li>
      <article className="card" style={customStyles}>
        <header className="card__head">
          <div className="card__tag">
            <p>#{pokemon.id.toString().padStart(3, "0")}</p>
          </div>

          <div className="card__tag">
            <TypeIcon type={primaryType} label="primary type" />
            {secondaryType && (
              <TypeIcon type={secondaryType} label="secondary type" />
            )}
          </div>
        </header>

        <img
          className="card__avatar"
          src={pokemon.image ?? undefined}
          loading="lazy"
          alt={`${pokemon.name} artwork`}
        />

        <section className="card__content">
          <FavoriteButton
            isFavorite={isFavorite}
            onClick={() => onToggleFavorite(pokemon)}
          />
          <h3 className="card__title">{pokemon.name}</h3>
          <PokemonStats stats={pokemon.stats} />
        </section>
      </article>
    </li>
  );
}
