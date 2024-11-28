
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App;
