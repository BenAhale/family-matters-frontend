import React from "react";
import { Home } from "./Home";
import { Calendar } from "./Calendar";
import { Groceries } from "./Groceries";
import { Chores } from "./Chores";
import "../styles/App.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

function App() {
  return (
    // wrap everything in BrowserRouter to initialize react router
    <BrowserRouter>
      <div>
        <nav>
          {/* navigation between different components */}
          <Link to="/">Home</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/groceries">Groceries</Link>
          <Link to="/chores">Chores</Link>
        </nav>
        {/* Routes */}
        <Switch>
          {/* defining routes with paths */}
          {/* first with exact prevents double rendering */}
          <Route exact path="/" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/groceries" component={Groceries} />
          <Route path="/chores" component={Chores} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
