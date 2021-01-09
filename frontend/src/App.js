import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Home from './routes/Home';
import ToDoDetail from './components/ToDoDetail';
import Navigation from './components/Navigation';
import Login from './routes/LogIn';


function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/" exact={true} component={Home} />
      <Route path="/detail/:id" component={ToDoDetail} />
    </HashRouter>
  );
}

export default App;
