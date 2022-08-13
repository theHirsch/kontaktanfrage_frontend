import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./views/Admin";
import Schedule from "./views/Schedule";

// URL/Path is settled here to APP (used in index.js), so we use the "localhost:3000" for the Schedule View and "localhost:3000/admin" for the Admin View 
export default function App() {
  return (
    <div className="container mx-auto">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Schedule />}>
        </Route>
        <Route path="/admin" element={<Admin />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}