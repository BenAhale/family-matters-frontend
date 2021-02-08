import React from "react";
import { Home } from "./Home";
import { Events } from "./Events";
import { Memories } from "./Memories";
import "../styles/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute'
import { SignIn } from './SignIn'
import { Navbar } from './Navbar'
import { SignUp } from './SignUp'
import { ImageForm } from './ImageForm'

function App() {
  return (
    // wrap everything in BrowserRouter to initialize react router
    <BrowserRouter>
      <div>
        <Navbar />
        {/* Routes */}
        <Switch>
          {/* defining routes with paths */}
          {/* first with exact prevents double rendering */}
          <ProtectedRoute exact path="/" component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <ProtectedRoute exact path="/memories" component={Memories} />
          <ProtectedRoute path="/events" component={Events} />
          <ProtectedRoute exact path="/memories/new" component={ImageForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
