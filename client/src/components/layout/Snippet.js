import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'

const Snippet = () => {
    return (
        <Fragment>
            <h2 className="my-3">Your snippets</h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Snippet Name</th>
                    <th scope="col">Language</th>
                    <th scope="col">Description</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td><a href="!#">Inverse Factorial</a></td>
                    <td className="java"><strong>Java</strong></td>
                    <td>Compute (n!)^-1 mod (a_prime_number)</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td><a href="!#">Segment Tree</a></td>
                    <td className="cpp"><strong>C++</strong></td>
                    <td>Boilerplate code for Segment Tree</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td><a href="!#">AVL Tree</a></td>
                    <td className="python"><strong>Python</strong></td>
                    <td>Boilerplate code for AVL Tree</td>
                </tr>
                </tbody>
            </table>
        </Fragment>
    )
}

// Snippet.propTypes = {

// }

export default Snippet
