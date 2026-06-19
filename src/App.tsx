import { Outlet } from "react-router-dom";
import { Header } from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";

export const App = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
