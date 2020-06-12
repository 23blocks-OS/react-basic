import React from "react";
import {Link} from 'react-router-dom';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/countries">Counties</Button>
      </Toolbar>
    </AppBar>
  )
}
