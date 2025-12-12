import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Landing from "../pages/Landing"
import ExplorePGs from "../pages/ExplorePGs"
import AddPG from "../pages/AddPG"
import PGDetails from "../pages/PGDetails"
import Login from "../pages/Login"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/explore" element={<ExplorePGs />} />
            <Route path="/add-pg" element={<AddPG />} />
            <Route path="/pg/:id" element={<PGDetails />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
