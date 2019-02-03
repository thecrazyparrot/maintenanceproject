import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button'


export default class AppHeader extends React.Component {

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
render() {
  return (
  <AppBar iconClassNameRight="muidocs-icon-navigation-expand-more" >
    <Toolbar>
      <Typography variant="title" color="inherit" > LA APP
       <Button onClick={this.handleClick} >Clic</Button>
      </Typography>
    </Toolbar>
  </AppBar>
  )
}
}




