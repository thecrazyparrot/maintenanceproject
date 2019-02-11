import {React,  Fragment} from 'react';
import CompaniesList from '../components/MyComponent'
import {
  Typography,
} from '@material-ui/core';


export default () => (
  <Fragment>
  <Typography variant="display1">Listado de empresas</Typography>
  <CompaniesList></CompaniesList>
  </Fragment>
);