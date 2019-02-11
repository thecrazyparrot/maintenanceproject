import React, { Fragment } from 'react';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';
import { Route } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Home from './pages/Home';
import CompaniesList from './components/CompaniesList'
import Devices from './components/devices/devices'
import Drawer from './components/Drawer'

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
    padding: 10 * theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      padding: 2 * theme.spacing.unit,
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    {/* <Drawer></Drawer> */}
    <main className={classes.main}>
    <Route  path="/" component={Home} />
    <Route  path="/empresas" component={CompaniesList} />
    <Route  path="/devices" component={Devices} />
    
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
