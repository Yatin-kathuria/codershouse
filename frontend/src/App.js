import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";

// Protected Routes
import GuestRoute from "./routes/GuestRoute";
import SemiProtectedRoute from "./routes/SemiProtectedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages Component
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Activate from "./pages/Activate/Activate";
import Authenticate from "./pages/Authenticate/Authenticate";
import Rooms from "./pages/Rooms/Rooms";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
