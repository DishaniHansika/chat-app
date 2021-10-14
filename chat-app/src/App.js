import { useState } from "react";
import{BrowserRouter as Router,Switch,Route} from "react-router-dom";
import UserLogin from "./components/UserLogin";
import Message from "./components/Message";
import Home from "./components/Home";
import useToken from "./useToken";
import './App.css';




function App() {
  const {token,setToken}= useToken();

  if(!token) {
    return <UserLogin setToken={setToken} />
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:groupId" component={Message}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
