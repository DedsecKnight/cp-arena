import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Alert = ({ alert }) => 
    alert !== null && alert.length > 0 && alert.map((a) => (
        <div key={a.id} className={`card text-white bg-${a.type} p-3 m-3 sticky-top`}>
            <h6>{a.msg}</h6>
        </div>
    ));


Alert.propTypes = {
    alert: PropTypes.array.isRequired
}

const state_props = state => ({
    alert: state.alert
})

export default connect(state_props, null)(Alert)
