import React from "react";
import { Home } from "./Home";
import { Events } from "./Events";
import { Memories } from "./Memories";
import { Groceries } from "./Groceries";
import { Chores } from "./Chores";
import "../styles/App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute'
import { SignIn } from './SignIn'
import { Navbar } from './Navbar'
import { SignUp } from './SignUp'

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
          <Route exact path="/" component={Home} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/memories" component={Memories} />
          <ProtectedRoute path="/events" component={Events} />
          <Route path="/groceries" component={Groceries} />
          <Route path="/chores" component={Chores} />
          <Route path="/sign-out" component={SignOut} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
