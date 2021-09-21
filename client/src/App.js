//import Lib
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import component
import Home from "./pages/Home";

// import assets & css
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
