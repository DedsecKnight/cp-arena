import React, { Fragment } from 'react'
import Navbar from './Navbar';
import Problemset from './Problemset';
import Profile from './Profile';

const Main = () => {
    return (
        <Fragment>
            <Navbar />
            <Profile /> 
        </Fragment>
    )
}

export default Main
