import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/home";
import CreateClientScreen from "../screens/create-client";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/create-client" element={<CreateClientScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
