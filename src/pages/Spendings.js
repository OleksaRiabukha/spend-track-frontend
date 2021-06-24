import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";

function Spendings(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }
  return (
    <div>
      <div>Spendings</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Spendings;