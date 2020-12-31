import React from 'react'

const Problemset = () => {
    return (
        <section className="container">
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
                    <tr>
                        <th scope="row">1</th>
                        <td><a href="#">Binary Search II</a></td>
                        <td className="normal"><strong>Normal</strong></td>
                        <td className="hide-sm">300</td>
                        <td className="hide-sm">200</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td><a href="#">Hello World !</a></td>
                        <td className="easy"><strong>Easy</strong></td>
                        <td className="hide-sm">1000</td>
                        <td className="hide-sm">1000</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td><a href="#">Longest Increasing Subsequence</a></td>
                        <td className="normal"><strong>Normal</strong></td>
                        <td className="hide-sm">500</td>
                        <td className="hide-sm">300</td>
                    </tr>
                    <tr>
                        <th scope="row">4</th>
                        <td><a href="#">Recover Binary Search Tree</a></td>
                        <td className="hard"><strong>Hard</strong></td>
                        <td className="hide-sm">600</td>
                        <td className="hide-sm">200</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Problemset;
