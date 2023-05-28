import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Addform() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const submitBook = async (e) => {
        e.preventDefault();
        const data = { title, author, genre }
        const res = await axios.post('/admin/addbook', data)
        if (res.status == 200) {
            toast.success("Book Added Successfully")
            setTitle('')
            setAuthor('')
            setGenre('')
        } else {
            toast.error("Unsuccess")
            setTitle('')
            setAuthor('')
            setGenre('')
        }
    }
    return (
        <div className="box mt-4">
            <h1 className="center-book">Add a Book</h1>
            <form onSubmit={submitBook}>
                <div className="mat">
                    <div class="form-group row w-50">
                        <label for="colFormLabel" class="col-sm-2 col-form-label bg-info" >Title</label>
                        <div class="col-sm-10">
                            <input onChange={(e) => setTitle(e.target.value)} type="text" value={title} class="form-control" id="colFormLabel" required />
                        </div>
                    </div>
                    <div class="form-group row w-50">
                        <label for="colFormLabel" class="col-sm-2 col-form-label bg-info" >Author</label>
                        <div class="col-sm-10">
                            <input onChange={(e) => setAuthor(e.target.value)} type="text" value={author} class="form-control" id="colFormLabel" required />
                        </div>
                    </div>
                    <div class="form-group row w-50">
                        <label for="colFormLabel" class="col-sm-2 col-form-label bg-info" >Genre</label>
                        <div class="col-sm-10">
                            <input onChange={(e) => setGenre(e.target.value)} type="text" value={genre} class="form-control" id="colFormLabel" required />
                        </div>
                    </div>
                </div>
                <div class="form-group row center-book">
                    <button type="submit" className="btn btn-success center-button">Submit</button>
                </div>
            </form>
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
        </div>

    )
}

export default Addform
