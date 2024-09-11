import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Login from "./CareSyncAuth.jsx";
import { Layout } from "./Layout.jsx";
import UserDetails from "./components/UserDetails.jsx";
import HealthInfo from "./components/HealthInfo.jsx";
import LifestyleInfo from "./components/LifeStyleInfo.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Layout />} />
        <Route path="/details/user-info" element={<UserDetails />} />
        <Route path="/details/health-info" element={<HealthInfo />} />
        <Route path="/details/life-info" element={<LifestyleInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
