import React, { useState } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/auth';

const Login = ({ loginUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const submit = (e) => {
        e.preventDefault(); 
        loginUser(formData);
    }

    const update = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    
    return (
        <div className="login-container">
            <div className="login-title">
                <h2><i className="fas fa-code"></i> CP-Arena</h2>
            </div>
            <form onSubmit={(e) => submit(e)} className="login-form">
                <div className="form-group">
                    <input type="email" name="email" className="form-control" onChange={e=>update(e)} placeholder="Enter email" value={formData.email}/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control" onChange={e=>update(e)} placeholder="Enter password" value={formData.password}/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary login-submit" />
                    {/* <a href="mystat.html" className="btn btn-primary login-submit">Login</a> */}
                </div>
                <small className="small-text">Not registered? <a href="register.html">Create an account</a></small>
            </form>  
        </div>
    );
}

export default connect(null, { loginUser })(Login);
