import React, { Component } from 'react';
import Table from '@material-ui/core/Table'
import Button from '@material-ui/core/Button'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Fragment, } from 'react';
import { Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon } from '@material-ui/icons';
import { withStyles, IconButton, } from '@material-ui/core';
import { withRouter, Route, Link } from "react-router-dom";

import { compose } from 'recompose';
import FormEditor2 from '../components/FormEditor2';



const API = process.env.REACT_APP_API || 'http://localhost:3000';

const styles = theme => ({
    posts: {
        marginTop: 2 * theme.spacing.unit,
    },
    fab: {
        position: 'absolute',
        bottom: 3 * theme.spacing.unit,
        right: 3 * theme.spacing.unit,
        [theme.breakpoints.down('xs')]: {
            bottom: 2 * theme.spacing.unit,
            right: 2 * theme.spacing.unit,
        },
    },
});

class CompaniesList extends Component {
    state = {
        loading: true,
        items: [],
    };






    // componentDidMount() {
    //     fetch('http://localhost:3000/companies')
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     items: result,
    //                     loading: false

    //                 });
    //                 console.log(result);
    //                 this.fetch('get', '/companies')
    //             },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 });
    //             }
    //         )
    // }

    componentDidMount() {
        this.getPosts();
    }


    async fetch(method, endpoint, body) {
        try {


            
            const response = await fetch(`${API}${endpoint}`, {
                method,
                body: body && JSON.stringify(body),
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',

                },
            }).then(res => res.json());

            return await response;
        } catch (error) {
            console.error(error);
        }
    }

    savePost = async (item) => {
  
        
        if (item.id) {
            await this.fetch('put', `/posts/${item.id}`, item);
        } else {
            await this.fetch('post', '/companies/', item);
        }

        this.props.history.goBack();
        this.getPosts();
    }

    async getPosts() {
        this.setState({ loading: false, items: await this.fetch('get', '/companies/') });
    }



    renderPostEditor = ({ match: { params: { id } } }) => {
        if (this.state.loading) return null;




        return <FormEditor2 post={this.state.items} onSave={this.savePost} />;
    };

    async deleteCompany(company) {
        if (window.confirm(`Are you sure you want to delete "${company.company_name}" ?`)) {
            await this.fetch('delete', `/companies/${company.id_company}`);
            this.getPosts();
        }
    }




    render() {

        const { error, loading, items } = this.state;


        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (loading) {
            return <div>Loading...</div>;
        } else {



            return (
                <Fragment>
                    <Button
                        color="secondary"
                        aria-label="add"
                        component={Link}
                        to="/empresas/new"

                    >
                        <AddIcon /> Agregar nueva empresa
                    </Button>
                    <Route exact path="/empresas/new" render={this.renderPostEditor} />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Empresa</TableCell>
                                <TableCell>Fecha de creación</TableCell>
                                <TableCell>Estatus</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {items.map(item => (

                                <TableRow key={item.id_company}>
                                    <TableCell scope="row">
                                        <IconButton color="inherit">
                                            <EditIcon />
                                        </IconButton>
                                        {/* <IconButton color="inherit">
                                            <AddIcon />
                                        </IconButton> */}
                                        <IconButton onClick={() => this.deleteCompany(item)} color="inherit">
                                            <DeleteIcon />
                                        </IconButton>

                                    </TableCell>
                                    <TableCell> {item.company_name}</TableCell>
                                    <TableCell> {item.company_creationDay}</TableCell>
                                    <TableCell> {item.company_active = 1 ? "Activa" : "Inactiva"}
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>


                </Fragment>

            );
        }
    }
}


export default compose(
    withRouter,
    withStyles(styles),
)(CompaniesList);

