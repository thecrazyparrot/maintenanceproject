import React, { Component } from 'react';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Fragment } from 'react';

import { Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon, Update as UpdateIcon } from '@material-ui/icons';
import {
    IconButton,
} from '@material-ui/core';
const API = process.env.REACT_APP_API || 'http://192.168.15.6:3000';

export default class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('http://192.168.15.6:3000/companies')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    //componentDidMount() {
    //this.getPosts();
    //}

    async fetch(method, endpoint, body) {
        try {

            const response = await fetch(`${API}${endpoint}`, {
                method,
                body: body && JSON.stringify(body),
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',

                },
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async getPosts() {
        this.setState({ loading: false, items: await this.fetch('get', '/companies') });
    }



    async deleteCompany(post) {

        if (window.confirm(`Are you sure you want to delete "${post.idCompany}" ?`)) {
            await this.fetch('delete', `/companies/${post.idCompany}`);
            this.getPosts();
        }
    }

    // renderPostEditor = ({ match: { params: { id } } }) => {
    //     if (this.state.loading) return null;
    //     const post = find(this.state.items, { id: Number(idCompany) });

    //     if (!post && id !== 'new') return <Redirect to="/" />;

    //     return <PostEditor post={post} onSave={this.savePost} />;
    // };


    render() {

        const { error, isLoaded, items } = this.state;


        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {



            return (
                <Fragment>



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

                                <TableRow key={item.idCompany}>
                                    <TableCell scope="row">
                                        <IconButton color="inherit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="inherit">
                                            <AddIcon />
                                        </IconButton>
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
                    {/* <Button
                        variant="fab"
                        color="secondary"
                        aria-label="add"
                        // className={classes.fab}
                        // component={Link}
                        to="/posts/new"
                    >
                        <AddIcon />
                    </Button> */}
                    {/* <Route exact path="/posts/:id" render={this.renderPostEditor} /> */}


                </Fragment>
            );
        }
    }
}