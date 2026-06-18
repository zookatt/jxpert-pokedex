import { render, screen } from "@testing-library/react";
import { PokemonStats } from "./PokemonStats";
import { describe, expect, it } from "vitest";
import type { Pokemon } from "../../types/pokemon";

const unorderedStats: Pokemon["stats"] = [
  { base_stat: 80, stat: { name: "speed" } },
  { base_stat: 49, stat: { name: "attack" } },
  { base_stat: 45, stat: { name: "hp" } },
  { base_stat: 65, stat: { name: "special-attack" } },
  { base_stat: 65, stat: { name: "special-defense" } },
  { base_stat: 49, stat: { name: "defense" } },
];

describe("PokemonStats", () => {
  it("renders stats by name even when they are unordered", () => {
    render(<PokemonStats stats={unorderedStats} />);
    expect(screen.getByLabelText("Health points")).toHaveTextContent("45");
    expect(screen.getByLabelText("Attack")).toHaveTextContent("49");
    expect(screen.getByLabelText("Defense")).toHaveTextContent("49");
    expect(screen.getByLabelText("Special attack")).toHaveTextContent("65");
    expect(screen.getByLabelText("Special defense")).toHaveTextContent("65");
    expect(screen.getByLabelText("Speed")).toHaveTextContent("80");
  });

  it("uses 0 when a stat is missing", () => {
    render(<PokemonStats stats={[]} />);

    expect(screen.getByLabelText("Health points")).toHaveTextContent("0");
    expect(screen.getByLabelText("Attack")).toHaveTextContent("0");
    expect(screen.getByLabelText("Defense")).toHaveTextContent("0");
    expect(screen.getByLabelText("Special attack")).toHaveTextContent("0");
    expect(screen.getByLabelText("Special defense")).toHaveTextContent("0");
    expect(screen.getByLabelText("Speed")).toHaveTextContent("0");
  });
});
