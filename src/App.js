import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/home.page";
import ClimaPage from "./page/clima.page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="weather" element={<HomePage />} />
        <Route path="clima" element={<ClimaPage />}>
          <Route path=":city" element={<ClimaPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
