import React, { Component } from 'react';

export default class UserList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {person: []};
    }
  
    componentDidMount() {
      this.UserList();
    }
  
    UserList() {
        fetch('https://randomuser.me/api/?results=2')
        .then(({ results }) => this.setState({ person: results }));
    }
  
    render() {
      const persons = this.state.person.map((item) => (
        <div>
          <h1>{ item.name.first }</h1>
          <span>{ item.cell }, { item.email }</span>
        </div>
      ));
  
      return (
        <div id="layout-content" className="layout-content-wrapper">
          <div className="panel-list">{ persons }</div>
        </div>
      );
    }
  }