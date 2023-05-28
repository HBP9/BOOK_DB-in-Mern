import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Editform from "./Editform";

function Home() {
    const [table, setTable] = useState([]);
    const [datas, setDatas] = useState({})
    var count = 0;
    useEffect(async () => {
        const res = await axios.get('/getBooks');
        setTable(res.data)
    }, [])

    const saveFav = async (title, e) => {
        const user = Cookies.get('user')
        if (user) {
            const data = { title, user }
            const res = await axios.post('/user/addFav', data)
            toast.success("Added to Fav")
        } else {
            toast.error('Login First')
        }
    }
    const buy = async (title, e) => {
        const user = Cookies.get('user')
        if (user) {
            const data = { title, user }
            const res = await axios.post('/user/buy', data)
            toast.success("Check your Books")
        } else {
            toast.error('Login First')
        }
    }
    const delBook = async (title, e) => {
        const user = Cookies.get('user')
        if (user) {
            const data = { title }
            const res = await axios.post('/admin/delbook', data)
            toast.success("Book Deleted")
            setTimeout(function () { location.reload(); }, 2000);
        } else {
            toast.error('Login First')
        }
    }
    // const editBook = async (title, e) => {
    //     const res = await axios.post('/admin/editbook', data)
    //     setDatas(res)
    //     console.log(datas)
    //     return <Editform data={datas} />
    // }
    if (Cookies.get('user') === 'Admin') {
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
                                <th scope="col">Action</th>
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
                                    <td><button className="heart-button" onClick={(e) => saveFav(ele.title, e)}><i class="fas fa-heart"></i></button><button className="heart-button" ><Link to={`/editbook/${ele.title}/${ele.author}/${ele.genre}`}><i class="far fa-edit"></i></Link></button><button className="heart-button" onClick={(e) => delBook(ele.title, e)}><i class="fas fa-trash"></i></button></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
        )
    } else {
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
                                <th scope="col">Favourites</th>
                                <th scope="col">Buy</th>
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
                                    <td><button className="heart-button" onClick={(e) => saveFav(ele.title, e)}><i class="fas fa-heart"></i></button></td>
                                    <td><button className="buy-button" onClick={(e) => buy(ele.title, e)}><i class="fas fa-shopping-basket"></i></button></td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </>
        )
    }
}

export default Home
