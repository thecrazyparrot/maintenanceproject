import React from 'react';
import { Fragment } from 'react';
import { render } from 'react-dom';
import { withFormik, Form, Field } from 'formik'
import { Typography } from '@material-ui/core'

export default () => (
    <Fragment>
        <Typography variant="display1">Seleccione una opción</Typography>
        <div className="container">
            <Form>
                <div className="field">
                    <div className="control">
                        <label className="label">Full Name</label>

                        <Field className="input" type="text" name="fullname" placeholder="Full Name" />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Email Address</label>

                        <Field className="input" type="email" name="email" placeholder="Email" />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Password</label>

                        <Field className="input" type="password" name="password" placeholder="Password" />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="checkbox">

                            <Field type="checkbox" name="newsletter" />
                            Join our newsletter?
            </label>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Pick your favorite editor</label>

                    <div className="control">
                        <Field component="select" name="editor">
                            <option value="atom">Atom</option>
                            <option value="sublime">Sublime Text</option>
                        </Field>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Do you test your code?</label>

                    <div className="control">
                        <label class="radio">
                            <input name="test" type="radio" value="yes" className="radio"
                            />
                            Yes
            </label>
                        <label className="radio">
                            <input
                                name="test" type="radio" value="no" className="radio"
                            />
                            No
            </label>
                    </div>
                </div>
                <button> Submit</button>


            </Form>
        </div>
    </Fragment>
)