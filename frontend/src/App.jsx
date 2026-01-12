import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VetChatWidget from "./component/ChatWidget";
import VetAdminDashboard from "./component/admin";

function App() {
  return (
    <Router>
      <div className="h-full w-full">
        <Routes>
          <Route path="/" element={<VetChatWidget />} />
          <Route path="/admin" element={<VetAdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
