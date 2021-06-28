import React, { useState } from "react"
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Spendings from './pages/Spendings';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from "./context/auth";
import Login from './pages/Login';
import Signup from './pages/SignUp';
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";


function App(props) {
  const [authTokens, setAuthTokens] = useState();
  const setTokens = (data) => {
    localStorage.setItem("token", data.jwt);
    setAuthTokens(data);
  }



  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Container style={{
        height: "100%",
        textAlign: "center",
        display: "inline-block"}}>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path='/spendings' component={Spendings} />
          </Switch>
          <Footer> 
            The best spendings tracking app Copyright © Alex Riabukha 
          </Footer>
        </Container>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;