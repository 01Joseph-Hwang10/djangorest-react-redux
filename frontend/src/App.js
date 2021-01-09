import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Home from './routes/Home';
import ToDoDetail from './components/ToDoDetail';
import Navigation from './components/Navigation';


function App() {
  return (
    <HashRouter>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/:id" exact={true} component={ToDoDetail} />
    </HashRouter>
  );
}

export default App;
