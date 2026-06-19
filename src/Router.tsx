import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./pages/HomePage";
import { FavoritesPage } from "./pages/FavoritesPage";

const routes = {
  home: {
    path: "/",
    element: HomePage,
  },
  favorites: {
    path: "/favorites",
    element: FavoritesPage,
  },
};

const router = createBrowserRouter([
  {
    element: <App />,
    children: Object.values(routes).map(({ element: Element, path }) => ({
      path,
      element: <Element />,
    })),
  },
  { path: "*", element: <div className="notfound">Page not found</div> },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
