import React, { Component } from 'react';


export default class Companies extends Component {
    constructor() {
        super();
        this.state = {
            companies: [],
            //company_name: [],
            // company_creationDay: [],
            // company_active: [],
        };
    }



    ComponentDidMount() {
        this.CompaniesList();
    }

    CompaniesList() {
        fetch('http://localhost:3000/companies')
            .then(({ results }) => this.setState({ companies: results }));
    }




    render() {
        return (
            <Companies></Companies>
        )
    }
}



