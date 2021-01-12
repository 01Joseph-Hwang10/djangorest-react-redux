import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Home from './routes/Home';
import Detail from './routes/Detail';
import Navigation from './modals/Navigation';
import Login from './routes/auth/LogIn';
import SignUp from './routes/auth/SignUp';
import Pinboard from './routes/Pinboard';


function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/login/signup" exact={true} component={SignUp} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/" exact={true} component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/pinboard/:id" component={Pinboard} />
    </HashRouter>
  );
}

export default App;
