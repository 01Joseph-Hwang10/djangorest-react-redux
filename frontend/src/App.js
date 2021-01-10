import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Home from './routes/Home';
import ToDoDetail from './components/ToDoDetail';
import Navigation from './modals/Navigation';
import Login from './routes/auth/LogIn';
import SignUp from './routes/auth/SignUp';


function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/login/signup" exact={true} component={SignUp} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/" exact={true} component={Home} />
      <Route path="/detail/:id" component={ToDoDetail} />
    </HashRouter>
  );
}

export default App;
