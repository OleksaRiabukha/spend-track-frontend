import { AppBar, Toolbar, Typography, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import Spendings from "../pages/Spendings";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
    position: "fixed",
    
  },
}));

export default function Header() {

  const { header } = useStyles();

  const displayDesktop = () => {
    return (
    <Toolbar>
      {spendTrackLogo}
      {getMenuButtons()}
    </Toolbar>

    )
  };

  const spendTrackLogo = (
    <Typography variant="h6" component="h1">
      Spend&Track
    </Typography>
  );

  const headersData = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "My Spendings",
      href: "/spendings"
    },
    {
      label: "Sign Up",
      href: "/signup"
    }
  ]

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button 
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };
  
  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
      <Toolbar />
    </header>
  );
}