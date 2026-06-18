import { renderHook, waitFor } from "@testing-library/react";
import { vi, describe, expect, it } from "vitest";
import { usePokemonsByRegion } from "./usePokemonsByRegion";
import type { Pokemon } from "../types/pokemon";
import type { RegionName } from "../constants/regions";

const mockPokemons = [
  {
    id: 1,
    name: "bulbasaur",
    types: [{ type: { name: "grass" } }],
    stats: [],
    sprites: { other: { "official-artwork": { front_default: null } } },
  },
] as Pokemon[];

describe("usePokemonsByRegion", () => {
  it("loads pokemons with the injected fetcher", async () => {
    const getPokemons = vi.fn().mockResolvedValue(mockPokemons);

    const { result } = renderHook(() =>
      usePokemonsByRegion("kanto", getPokemons),
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(getPokemons).toHaveBeenCalledWith("kanto");
    expect(result.current.pokemons).toEqual(mockPokemons);
    expect(result.current.error).toBeNull();
  });

  it("sets an error when the fetcher fails", async () => {
    const getPokemons = vi.fn().mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() =>
      usePokemonsByRegion("kanto", getPokemons),
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemons).toEqual([]);
    expect(result.current.error).toBe("Could not load pokemons");
  });

  it("loads again when the region changes", async () => {
    const getPokemons = vi.fn().mockResolvedValue(mockPokemons);

    const { rerender } = renderHook(
      ({ region }: { region: RegionName }) =>
        usePokemonsByRegion(region, getPokemons),
      { initialProps: { region: "kanto" as RegionName } },
    );

    await waitFor(() => {
      expect(getPokemons).toHaveBeenCalledWith("kanto");
    });

    rerender({ region: "johto" });

    await waitFor(() => {
      expect(getPokemons).toHaveBeenCalledWith("johto");
    });

    expect(getPokemons).toHaveBeenCalledTimes(2);
  });
});
