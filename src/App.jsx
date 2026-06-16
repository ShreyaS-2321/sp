import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Landing from "../pages/Landing";
import ExplorePGs from "../pages/ExplorePGs";
import AddPG from "../pages/AddPG";
import PGDetails from "../pages/PGDetails";
import Signup from "../pages/signup";
import Login from "../pages/Login";
import OwnerDashboard from "../pages/OwnerDashboard";
import "./index.css";

function App() {
  const location = useLocation();

  // Define paths where the Navbar should NOT appear
  const hideNavbarPaths = ["/signup", "/login","/add-pg","/owner-dashboard"]; // Add more paths as needed

  // Check if current path matches any in the list
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Conditionally render the Navbar */}
      {shouldShowNavbar && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<ExplorePGs />} />
          <Route path="/add-pg" element={<AddPG />} />
          <Route path="/pg/:id" element={<PGDetails />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          <Route
            path="*"
            element={
              <div className="text-center text-black mt-20 text-xl">
                Page not found 😿
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;