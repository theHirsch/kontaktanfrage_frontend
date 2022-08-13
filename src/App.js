import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./views/Admin";
import Schedule from "./views/Schedule";

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