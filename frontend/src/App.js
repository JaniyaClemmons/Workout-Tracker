
/**
 * Pages are to serve up the different endpoints
 * 
 * BrowserRouter - wraps everywhere we want to use the browser/routing
 * Routes - Wraps routes -looks through all its child routes to find the best
 *     match and renders that branch of the UI 
 * Route - create a route (can have nested messages and tasks inside /)
 */
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Workouts from "./pages/Workouts";
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup";
import Login from "./pages/Login";



function App() {
  const { user } = useAuthContext();
  //The different pages will go inside pages div
  //path is the endpoint and element is page component we render for that route
  return (
    //If logged in cant see login/signup - if logged out can't see home page 
    <div className="App">
     <BrowserRouter>
     <Navbar />
     <div className="pages">
        <Routes>
          <Route 
            path="/"
            element= {user ? <Home />: <Navigate to= "/login" /> }
          />
           <Route 
            path="/exercises"
            element= {user ? <Exercises />: <Navigate to= "/login"/>}
          />
          <Route 
            path="/workouts"
            element= {user ? <Workouts />: <Navigate to= "/login"/>}
          />
          <Route 
            path="/signup"
            element= {!user ? <Signup /> : <Navigate to="/"/>}
          />
          <Route 
            path="/login"
            element= {!user ? <Login /> : <Navigate to="/"/>}
          />
        </Routes>
     </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
