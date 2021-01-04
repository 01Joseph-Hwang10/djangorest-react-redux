import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Home from './routes/Home';
import ToDoDetail from './components/ToDoDetail';


function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/:id" exact={true} component={ToDoDetail} />
    </HashRouter>
  );
}

export default App;
