import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favourite from "./components/Favourite";
import Addform from "./components/Addform";
import Editform from "./components/Editform";
import Main from "./components/Main";
import Buy from "./components/Buy";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/favourite">
            <Favourite />
          </Route>
          <Route path='/addbook'>
            <Addform />
          </Route>
          <Route path="/editbook/:titles/:authors/:genres" >
            <Editform />
          </Route>
          <Route path="/books">
            <Home />
          </Route>
          <Route path="/userBooks">
            <Buy />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
