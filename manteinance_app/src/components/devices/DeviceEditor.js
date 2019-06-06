import React from 'react';
import {
    withStyles,
    Card,
    CardContent,
    CardActions,
    Modal,
    Button,
    TextField,
} from '@material-ui/core';
import { compose } from 'recompose';
import { Form, Field } from 'react-final-form';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalCard: {
        width: '90%',
        maxWidth: 500,
    },
    modalCardContent: {
        display: 'flex',
        flexDirection: 'column',
    },
    marginTop: {
        marginTop: 2 * theme.spacing.unit,
    },
});










const DeviceEditor = ({ classes, onSave, history, companieslist, handleChange, Device }) => (
    <Form initialValues={Device} onSubmit={onSave} >
        {({ handleSubmit }) => (
            <Modal
                className={classes.modal}
                onClose={() => history.goBack()}
                open
            >
                <Card className={classes.modalCard}>
                    <form onSubmit={handleSubmit}>
                        <CardContent className={classes.modalCardContent}>
                            <Field
                                name="deviceName"

                            >

                                {({ input }) => <TextField label="TagId" autoFocus {...input} />}
                            </Field>
                            <Field  name="companyIdCompany">
                            {({ input }) =>  <TextField
                                select
                                label="Select Company"
                                className={classNames(classes.margin, classes.textField)}
                                value= {companieslist[0].id_company}
                                {...input}

                            // onChange={console.log('a')}
                            // InputProps={{
                            //     startAdornment: <DeviceEditor position="start"></DeviceEditor>,
                            // }}
                            >
                                {companieslist.map(option => (
                                    <MenuItem key={option.id_company} value={option.id_company}>
                                        {option.company_name}
                                    </MenuItem>
                                    
                                ))}
                            </TextField>}
                            </Field>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" type="submit">Save</Button>
                            <Button size="small" onClick={() => history.goBack()}>Cancel</Button>
                        </CardActions>
                    </form>
                </Card>
            </Modal>
        )}
    </Form>
)



export default compose(
    withRouter,
    withStyles(styles),
)(DeviceEditor);