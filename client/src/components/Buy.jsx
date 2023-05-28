import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
function Buy() {
    const [table, setTable] = useState([]);
    var count = 0;
    useEffect(async () => {
        const res = await axios.get(`/user/getBuys/${Cookies.get('user')}`);
        setTable(res.data)
    }, [])

    return (
        <>
            <div className="home mt-2 container">
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Genre</th>
                            <th scope="col">View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((ele) => {
                            count++
                            return (<tr  >
                                <th scope="row">{count}</th>
                                <td>{ele.title}</td>
                                <td>{ele.author}</td>
                                <td>{ele.genre}</td>
                                <td><i class="fas fa-eye"></i></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Buy
