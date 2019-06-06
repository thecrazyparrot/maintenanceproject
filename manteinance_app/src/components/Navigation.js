import React, { Component } from 'react';
import { Fragment } from 'react';


const API = process.env.REACT_APP_API || 'http://192.168.15.6:3000';

function About() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
  
  function Topics({ match }) {
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>
  
        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route
          exact
          path={match.path}
          render={() => <h3>Please select a topic.</h3>}
        />
      </div>
    );
  }
  
  function Topic({ match }) {
    return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    );
  }

export default class MyComponent extends Component {


}