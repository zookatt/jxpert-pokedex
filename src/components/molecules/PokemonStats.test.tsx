import { render, screen } from "@testing-library/react";
import { PokemonStats } from "./PokemonStats";
import { describe, expect, it } from "vitest";
import type { PokemonCardData } from "../../types/pokemon";

const stats: PokemonCardData["stats"] = {
  hp: 45,
  attack: 49,
  defense: 49,
  "special-attack": 65,
  "special-defense": 65,
  speed: 80,
};

describe("PokemonStats", () => {
  it("renders stats by name", () => {
    render(<PokemonStats stats={stats} />);
    expect(screen.getByLabelText("Health points")).toHaveTextContent("45");
    expect(screen.getByLabelText("Attack")).toHaveTextContent("49");
    expect(screen.getByLabelText("Defense")).toHaveTextContent("49");
    expect(screen.getByLabelText("Special attack")).toHaveTextContent("65");
    expect(screen.getByLabelText("Special defense")).toHaveTextContent("65");
    expect(screen.getByLabelText("Speed")).toHaveTextContent("80");
  });
});
