import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Flow from "./components/Flow.jsx";
import ReviewScreenLayout from "./components/ReviewPage.jsx";
import { Home } from "./components/Home.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Flow />} />
        <Route path="/review" element={<ReviewScreenLayout />} />
      </Routes>
    </Router>
  );
}
