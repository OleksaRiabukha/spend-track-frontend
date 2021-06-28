import React from "react";
import { Link } from 'react-router-dom';

import { 
 Typography,
 Grid, 
 Button} from "@material-ui/core";

function Home(props) {
  return (
  <Grid >
    <Typography color="textPrimary" gutterBottom variant="h2" align="center"> 
      Spend money and track expenses!
    </Typography>
    <Button 
    size="large" 
    variant="contained" 
    color="primary"
    component={Link}
    to="/spendings"
    >
      Track your spendings!
    </Button>
  </Grid>
  )
}

export default Home;