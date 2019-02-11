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
import { withRouter, Route, Link, Redirect } from "react-router-dom";
import DeviceEditor from '../devices/DeviceEditor'
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { find } from 'lodash';



const API = process.env.REACT_APP_API || 'http://localhost:3000';
const endpoint = '/devices/';
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

class Devices extends Component {
    state = {
        loading: true,
        items: []
    };

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
        if (item.deviceId) {
            await this.fetch('put', `${endpoint}/${item.deviceId}`, item);
        } else {
            await this.fetch('post', endpoint, item);
        }
        this.props.history.goBack();
        this.getPosts();
    }

    async getPosts() {
        this.setState({
            loading: false,
            items: await this.fetch('get', endpoint + '?sort=deviceName'),
            companieslist: await this.fetch('get', '/companies/'),
        });
    }

    renderPostEditor = ({ match: { params: { deviceId } } }) => {
        const device = find(this.state.items, { deviceId: Number(deviceId) });
        // if (!device && deviceId !== 'new') return <Redirect to="/devices" />;
        // if (this.state.loading) return null;
        return <DeviceEditor Device={device} handleChange={this.handleChange} post={this.state.items} onSave={this.savePost} companieslist={this.state.companieslist} />;
    };

    async delete(item) {
        console.log(item);
        if (window.confirm(`Are you sure you want to delete "${item.deviceName}" ?`)) {
            await this.fetch('delete', `${endpoint}${item.deviceId}`);
            this.getPosts();
        }
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    render() {
        const { error, loading, items, AddingNew } = this.state;
        
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
                        to="/devices/new"
                    >
                        <AddIcon /> Agregar nuevo elemento
                    </Button>
                    <Route path="/devices/:deviceId" render={this.renderPostEditor} />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Numero economico/TagId</TableCell>
                                <TableCell>Fecha de creación</TableCell>
                                <TableCell>Activo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(item => (
                                <TableRow key={item.deviceId} button="true" component={Link} to={`/devices/${item.deviceId}`}>
                                    <TableCell scope="row">
                                        <IconButton color="inherit">
                                            <EditIcon />
                                        </IconButton>
                                        {/* <IconButton color="inherit">
                                            <AddIcon />
                                        </IconButton> */}
                                        <IconButton onClick={() => this.delete(item)} color="inherit">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell> {item.deviceName}</TableCell>
                                    <TableCell > {item.createdAt}</TableCell>
                                    <TableCell> {item.DeviceEnable = 1 ? "Activa" : "Inactiva"}
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
Devices.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default compose(
    withRouter,
    withStyles(styles),
)(Devices);

