import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';

const Problemset = () => {
    var [problemSet, initializeProblemset] = useState([]);
    const getProblemSet = async() => {
        const res = await axios.get('http://localhost:5000/api/problems');
        initializeProblemset(res.data);
    }
    
    useEffect(() => {
        getProblemSet();
    }, []);

    return (
        <Fragment>
            <h2 className="my-5">Let's solve some problems</h2>
            <div className="problem-list">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Problem Name</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col" className="hide-sm">Submissions</th>
                        <th scope="col" className="hide-sm">Accepted</th>
                    </tr>
                    </thead>
                    <tbody>
                        {problemSet.map((problem, idx) => (
                            <tr key={idx}>
                                <th scope="row">{idx+1}</th>
                                <td><a href="!#">{problem.name}</a></td>
                                <td className={problem.difficulty}><strong>{problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}</strong></td>
                                <td className="hide-sm">300</td>
                                <td className="hide-sm">200</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default Problemset;
