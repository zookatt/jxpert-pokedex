import { beforeEach, describe, expect, it, vi } from "vitest";

function mockFetchResponse(data: unknown, ok = true) {
  return Promise.resolve({
    ok,
    json: () => Promise.resolve(data),
  } as Response);
}

beforeEach(() => {
  vi.resetModules();
  vi.restoreAllMocks();
});

describe("getPokemonsByRegion", () => {
  it("returns pokemons when API responses are ok", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        await mockFetchResponse({
          results: [{ name: "bulbasaur", url: "https://pokeapi.test/1" }],
        }),
      )
      .mockResolvedValueOnce(
        await mockFetchResponse({
          id: 1,
          name: "bulbasaur",
          types: [],
          stats: [],
          sprites: {
            other: { "official-artwork": { front_default: null } },
          },
        }),
      );

    vi.stubGlobal("fetch", fetchMock);

    const { getPokemonsByRegion } = await import("./pokemonApi");

    const result = await getPokemonsByRegion("kanto");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("bulbasaur");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("throws when pokemon list request fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(await mockFetchResponse({}, false)),
    );

    const { getPokemonsByRegion } = await import("./pokemonApi");

    await expect(getPokemonsByRegion("kanto")).rejects.toThrow(
      "Could not fetch pokemon list",
    );
  });

  it("throws when pokemon detail request fails", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        await mockFetchResponse({
          results: [{ name: "bulbasaur", url: "https://pokeapi.test/1" }],
        }),
      )
      .mockResolvedValueOnce(await mockFetchResponse({}, false));

    vi.stubGlobal("fetch", fetchMock);

    const { getPokemonsByRegion } = await import("./pokemonApi");

    await expect(getPokemonsByRegion("kanto")).rejects.toThrow(
      "Could not fetch pokemon detail",
    );
  });

  it("uses cached pokemons for repeated region requests", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        await mockFetchResponse({
          results: [{ name: "bulbasaur", url: "https://pokeapi.test/1" }],
        }),
      )
      .mockResolvedValueOnce(
        await mockFetchResponse({
          id: 1,
          name: "bulbasaur",
          types: [],
          stats: [],
          sprites: {
            other: { "official-artwork": { front_default: null } },
          },
        }),
      );

    vi.stubGlobal("fetch", fetchMock);

    const { getPokemonsByRegion } = await import("./pokemonApi");

    await getPokemonsByRegion("kanto");
    await getPokemonsByRegion("kanto");

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("limits concurrent pokemon detail requests", async () => {
    const pokemonList = Array.from({ length: 25 }, (_, index) => ({
      name: `pokemon-${index}`,
      url: `https://pokeapi.test/${index}`,
    }));
    let activeDetailRequests = 0;
    let maxActiveDetailRequests = 0;

    const fetchMock = vi.fn((url: string) => {
      if (url.includes("/pokemon?")) {
        return mockFetchResponse({ results: pokemonList });
      }

      activeDetailRequests += 1;
      maxActiveDetailRequests = Math.max(
        maxActiveDetailRequests,
        activeDetailRequests,
      );

      return new Promise<Response>((resolve) => {
        setTimeout(() => {
          activeDetailRequests -= 1;
          resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                id: Number(url.split("/").at(-1)),
                name: "pokemon",
                types: [],
                stats: [],
                sprites: {
                  other: { "official-artwork": { front_default: null } },
                },
              }),
          } as Response);
        }, 0);
      });
    });

    vi.stubGlobal("fetch", fetchMock);

    const { getPokemonsByRegion } = await import("./pokemonApi");

    const result = await getPokemonsByRegion("kanto");

    expect(result).toHaveLength(25);
    expect(maxActiveDetailRequests).toBeLessThanOrEqual(20);
  });
});
