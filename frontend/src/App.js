import { useState } from "react";
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
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import Room from "./pages/Room/Room";

function App() {
  const [loading] = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading, please wait..." />
  ) : (
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
        <ProtectedRoute path="/room/:id">
          <Room />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
