import React, { useState } from "react"
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './pages/Home';
import Spendings from './pages/Spendings';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from "./context/auth";
import Login from './pages/Login';
import Signup from './pages/SignUp';

function App(props) {
  const [authTokens, setAuthTokens] = useState();
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div>
          <Link to="/">Home page</Link>
          <Link to="/private">Spendings</Link>
          <Route exact path='/' component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path='/private' component={Spendings} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;