import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";

// Protected Routes
import GuestRoute from "./routes/GuestRoute";
import SemiProtectedRoute from "./routes/SemiProtectedRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages Component
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
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
        {/* <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
