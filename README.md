# Jxpert Pokédex

Pokédex hecha con React, TypeScript y Vite.

La aplicación permite consultar Pokémon por región, buscarlos por nombre o tipo, ordenarlos por estadísticas y guardar favoritos en `localStorage`. También añadí una página `/favorites` donde se muestra el equipo favorito como un collage visual tipo "Dream team".

La idea principal del proyecto fue no solo hacer que la app funcionara, sino intentar organizarla de una forma mantenible, testeable y fácil de explicar.

## Stack

- React 18
- TypeScript
- Vite
- React Router
- Vitest
- React Testing Library
- ESLint
- Prettier
- Husky

## Funcionalidades

- Carga de Pokémon desde PokeAPI.
- Selección de región.
- Búsqueda por nombre o tipo.
- Ordenación por estadísticas.
- Tarjetas con información visual, tipos y stats.
- Botón para añadir o quitar favoritos.
- Favoritos persistidos en `localStorage`.
- Ruta `/favorites` para ver el equipo favorito.
- Collage del Dream Team usando las imágenes de los Pokémon favoritos.
- Estados de carga, vacío y error.
- Controles accesibles con botones nativos y atributos ARIA.

## Estructura del Proyecto

Intenté separar el código por responsabilidades:

```text
src/
  components/
    atoms/        Componentes pequeños y reutilizables
    molecules/    Componentes de UI un poco más compuestos
    organisms/    Secciones grandes de la interfaz
  constants/      Datos fijos como regiones, iconos y opciones
  hooks/          Estado y lógica de React
  pages/          Páginas de la app
  services/       Acceso a la API
  types/          Tipos de TypeScript
  utils/          Funciones puras, helpers y mappers
```

Mi objetivo fue que los componentes se encargaran sobre todo de pintar UI, y que la lógica viviera en hooks, services o utils.

## Decisiones Técnicas

### Normalización de Datos

PokeAPI devuelve objetos bastante grandes y profundos. Por ejemplo:

```ts
pokemon.sprites.other["official-artwork"].front_default;
pokemon.types[0].type.name;
pokemon.stats[0].base_stat;
```

Para no usar esa estructura directamente en todos los componentes, creé un mapper en `pokemonMap.ts`. Ese mapper convierte la respuesta de PokeAPI a un modelo más cómodo para la UI: `PokemonCardData`.

Así los componentes pueden trabajar con algo más simple:

```ts
pokemon.image;
pokemon.types;
pokemon.stats.attack;
pokemon.height;
pokemon.weight;
```

Esto me ayudó a desacoplar la UI de la forma exacta de la API externa.

### Carga desde PokeAPI

La lógica de llamadas está en `pokemonApi.ts`.

Ahí añadí:

- validación de `response.ok`
- manejo de errores
- caché por región
- límite de concurrencia para no lanzar demasiadas peticiones a la vez

Esto último lo hice porque algunas regiones necesitan muchas peticiones de detalle, y no quería dispararlas todas en paralelo sin control.

### Favoritos

Separé favoritos en dos partes:

- `pokemonFavoritesStorage.ts`: funciones para leer, guardar y alternar favoritos en `localStorage`
- `useFavoritePokemons.ts`: hook que conecta esa lógica con React

Así los componentes no usan `localStorage` directamente. Solo reciben props como `isFavorite` y `onToggleFavorite`.

### Dream Team Collage

En `/favorites` no reutilicé la grid de tarjetas porque el diseño pedía otra experiencia visual.

Creé `FavoritesCollage`, que muestra hasta seis Pokémon favoritos en una composición tipo collage. El tamaño de cada Pokémon se calcula con `height` y `weight` de PokeAPI usando `pokemonVisualSize.ts`.

La posición del collage se controla con CSS porque PokeAPI no da coordenadas visuales. Mi decisión fue usar datos reales para el tamaño y slots de CSS para respetar el diseño.

## Rutas

```text
/            Pokédex principal
/favorites   Equipo favorito
```

## Scripts

Instalar dependencias:

```bash
pnpm install
```

Arrancar el proyecto:

```bash
pnpm dev
```

Crear build:

```bash
pnpm build
```

Previsualizar build:

```bash
pnpm preview
```

Linter:

```bash
pnpm lint
```

Formatear:

```bash
pnpm format
```

Comprobar formato:

```bash
pnpm format:check
```

Tests:

```bash
pnpm test
```

Tests una sola vez:

```bash
pnpm test --run
```

Coverage:

```bash
pnpm test:coverage
```

## Testing

No intenté testear todos los componentes por obligación. Preferí cubrir las partes que tienen más lógica o más riesgo de romper comportamiento.

Tests principales:

- `pokemonFilter`: búsqueda por nombre y tipo.
- `pokemonSort`: ordenación por id y estadísticas.
- `pokemonMap`: transformación de datos de PokeAPI al modelo interno.
- `pokemonApi`: respuestas correctas, errores, caché y concurrencia.
- `pokemonFavoritesStorage`: persistencia en `localStorage`.
- `useFavoritePokemons`: estado de favoritos.
- `usePokemonsByRegion`: carga, error y cambio de región.
- `useVisiblePokemons`: integración entre búsqueda y ordenación.
- `FavoriteButton`: accesibilidad y evento click.
- `PokemonGrid` y `PokemonStats`: renderizado y estados principales.

La intención fue demostrar criterio: testear lógica importante, hooks, servicios y componentes interactivos, sin añadir tests poco útiles solo para subir cobertura.

## Accesibilidad y Calidad

Algunas mejoras que añadí:

- Uso de `button` en ves de span y li para elementos interactivos.
- `aria-label` en controles sin texto visible.
- `aria-pressed` en el botón de favoritos.
- `aria-expanded` en botones que abren menús.
- SVGs decorativos con `aria-hidden`.
- Navegación con React Router.
- Husky para ejecutar validaciones antes de hacer commit.

## Mejoras Futuras

Algunas cosas que seguiría mejorando:

- Añadir un test e2e con Playwright.
- Pulir más el collage en diferentes tamaños de pantalla.
- Añadir un filtro cuando hay favoritos para saber cuales pokemons son favoritos
