import React,{useEffect, useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const Write = () => {
  const state = useLocation().state

  const navigate = useNavigate()
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.desc || "");  
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [img, setImg] = useState(state?.img || "")

  const search = useLocation().search 

  useEffect(()=>{
    if (search == ''){
      setTitle("")
      setValue("")
      setFile(null)
      setCat("")
      setImg("")
    }
  },[search])

  const upload = async()=>{
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async e =>{
    e.preventDefault()
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`/api/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : img[0],
          })
        : await axios.post(`/api/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : img[0],
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input value={title} type="text" placeholder='Title' onChange={e => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />;
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display: "none"}} type="file" name="" id="file" onChange={e => setFile(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className='cat'>
            {
              cat === 'art' ? 
              <input type="radio" name="cat" value="art" id="art" onChange={e => setCat(e.target.value)} defaultChecked/>
              :
              <input type="radio" name="cat" value="art" id="art" onChange={e => setCat(e.target.value)}/>
            }
            <label htmlFor="art">Art</label>
          </div>
          <div className='cat'>
            {
              cat === 'science' ? 
              <input type="radio" name="cat" value="science" id="science" onChange={e => setCat(e.target.value)} defaultChecked/>
              :
              <input type="radio" name="cat" value="science" id="science" onChange={e => setCat(e.target.value)}/>
            }
            <label htmlFor="science">Science</label>
          </div>
          <div className='cat'>
            {
              cat === 'technology' ? 
              <input type="radio" name="cat" value="technology" id="technology" onChange={e => setCat(e.target.value)} defaultChecked/>
              :
              <input type="radio" name="cat" value="technology" id="technology" onChange={e => setCat(e.target.value)}/>
            }
            <label htmlFor="technology">Technology</label>
          </div>
          <div className='cat'>
            {
              cat === 'cinema' ? 
              <input type="radio" name="cat" value="cinema" id="cinema" onChange={e => setCat(e.target.value)} defaultChecked/>
              :
              <input type="radio" name="cat" value="cinema" id="cinema" onChange={e => setCat(e.target.value)}/>
            }
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className='cat'>
            {
              cat === 'design' ? 
              <input type="radio" name="cat" value="design" id="design" onChange={e => setCat(e.target.value)} defaultChecked/>
              :
              <input type="radio" name="cat" value="design" id="design" onChange={e => setCat(e.target.value)}/>
            }
            <label htmlFor="design">Design</label>
          </div>
          <div className='cat'>
            {
              cat === 'food' ? 
              <input type="radio" name="cat" value="food" id="food" onChange={e => setCat(e.target.value)} defaultChecked/>
              :
              <input type="radio" name="cat" value="food" id="food" onChange={e => setCat(e.target.value)}/>
            }
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
