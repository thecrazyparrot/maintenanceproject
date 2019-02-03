import React, { Fragment } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import MyComponent from './components/MyComponent'


// callApi(){
//   // Github fetch library : https://github.com/github/fetch
//   // Call the API page
//   fetch('https://www.reddit.com/r/reactjs.json')
//   .then((result) => {
//     // Get the result
//     // If we want text, call result.text()
//     return result.json();
//   }).then((jsonResult) => {
//     // Do something with the result
//     console.log(jsonResult);
//   })
// }

const styles = theme => ({
  main: {
    padding: 3 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <main className={classes.main}>
      <Home />
     
      
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
