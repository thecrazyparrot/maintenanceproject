import React, { Component } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Typography } from '@material-ui/core'

import CompaniesList from './CompaniesList';


export default class Home extends Component {


  render() {
    return (
      <Fragment>
        <Typography variant="display1">Seleccione una opción</Typography>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Inicio</Link>
              </li>
              <li>
                <Link to="/Empresas">Empresas</Link>
              </li>
              <li>
                <Link to="/Catálogos">Catálogos</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/Empresas" component={CompaniesList} />
            {/* <Route path="/Empresas" component={About} />
              <Route path="/Catálogos" component={Topics} /> */}
          </div>
        </Router>
      </Fragment>)
  }


  // //     constructor(props) {
  // //         super(props);
  // //         this.state = {
  // //             error: null,
  // //             isLoaded: false,
  // //             items: []
  // //         };
  // //     }

  // //     function About() {
  // //         return (
  // //           <div>
  // //             <h2>About</h2>
  // //           </div>
  // //         );
  // //       }

  // //       function Topics({ match }) {
  // //         return (
  // //           <div>
  // //             <h2>Topics</h2>
  // //             <ul>
  // //               <li>
  // //                 <Link to={`${match.url}/rendering`}>Rendering with React</Link>
  // //               </li>
  // //               <li>
  // //                 <Link to={`${match.url}/components`}>Components</Link>
  // //               </li>
  // //               <li>
  // //                 <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
  // //               </li>
  // //             </ul>

  // //             <Route path={`${match.path}/:topicId`} component={Topic} />
  // //             <Route
  // //               exact
  // //               path={match.path}
  // //               render={() => <h3>Please select a topic.</h3>}
  // //             />
  // //           </div>
  // //         );
  // //       }

  // //       function Topic({ match }) {
  // //         return (
  // //           <div>
  // //             <h3>{match.params.topicId}</h3>
  // //           </div>
  // //         );
  // //       }

}