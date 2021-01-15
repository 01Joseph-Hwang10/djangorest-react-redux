import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Home from './routes/Home';
import Detail from './routes/Detail';
import Navigation from './modals/Navigation';
import Login from './routes/auth/LogIn';
import SignUp from './routes/auth/SignUp';
import Pinboard from './routes/Pinboard';
import Footer from './modals/Footer';
import ProfileUpdate from './routes/ProfileUpdate';
import UserProfile from './routes/UserProfile';
import Enter from './routes/Enter';


function App(props) {
  return (
    <HashRouter>
      <Route path="/" exact component={Enter} />
      <Navigation />
      <div style={{minHeight:"75vh"}}>
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/login/signup" exact component={SignUp} />
        <Route path="/detail/:id" exact component={Detail} />
        <Route path="/pinboard/:user_id" exact component={Pinboard} />
        <Route path="/user_profile/:user_id" exact component={UserProfile} />
        <Route path="/pinboard/:user_id/setttings" exaxt component={ProfileUpdate} />
      </div>
      <Footer />
    </HashRouter>
  );
}

export default App;
