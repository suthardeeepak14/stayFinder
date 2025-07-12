import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navigation from "./components/Navigation";
// import Footer from "./components/Footer";
// import Homepage from "./pages/HomePage";
// import PropertyDetails from "./pages/PropertyDetails";
// import UserDashboard from "./pages/UserDashboard";
// import HostDashboard from "./pages/HostDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        {/* <Route path="/" element={<Homepage />} /> */}
        {/* <Route path="/property/:id" element={<PropertyDetails />} /> */}
        {/* <Route path="/dashboard" element={<UserDashboard />} /> */}
        {/* <Route path="/host-dashboard" element={<HostDashboard />} />  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
