import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from '../../actions/auth';

const Register = ({ registerUser }) => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name : '',
        handle: '',
        email: '',
        password: '',
        language: '',
    })

    const update = (e) => {
        setFormData({
            ...formData, 
            [e.target.name] : e.target.value
        })
    }

    const submit = async (e) => {
        e.preventDefault();
        await registerUser(formData);
        history.push('/');
    }

    return (
        <Fragment>
            <nav className="navbar">
                <div className="logo">
                    <h2><i className="fas fa-code"></i> CP-Arena</h2>
                </div>
            </nav>

            <section className="container">
                <h2 className="my-5">Let's get you ready to solve some problems</h2>
                <form className="cparena-form" onSubmit={e => submit(e)}>
                    <div className="form-group">
                        <input type="text" className="form-control" onChange={(e) => update(e)} name="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" onChange={(e) => update(e)} name="handle" placeholder="Handle (nickname)" />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" onChange={(e) => update(e)} name="email" placeholder="Email" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" onChange={(e) => update(e)} name="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <select name="language" defaultValue="" className="form-control" onChange={(e) => update(e)}>
                            <option value="">Choose a programming language</option>
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary login-submit" />  
                        {/* <a href="mystat.html" className="btn btn-primary login-submit">Register</a> */}
                    </div>
                </form>
            </section>

        </Fragment>
    )
}

Register.propTypes = {
    registerUser : PropTypes.func.isRequired,
}

export default connect(null, { registerUser })(Register);