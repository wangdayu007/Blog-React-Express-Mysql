import React, { useContext, useEffect, useState } from "react";
import Edit from "../imgs/edit.png";
import Delete from "../imgs/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import moment from 'moment'
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";


const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation()
  const navigate = useNavigate()

  const postId = location.pathname.split('/')[2]
  const { currentUser } = useContext(AuthContext)


  const fetchData = async ()=>{
    try {
      const res = await axios.get(`/api/posts/${postId}`)
      setPost(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchData()
  },[postId])

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/api/posts/${postId}`)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  
  const getImg = (url) =>{
    if (url?.includes('http')){
      return url
    } else {
      return `../upload/${url}`
    }
  }
  return (
    <div className="single">
      <div className="content">
        <img src={getImg(post?.img)} alt="" />
        <div className="user">
          { post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          { currentUser?.username === post?.username 
          && (<div className="edit">
            <Link to={`/write?edit=2`} state={post}>
            <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>
          )}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
        </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

export default Single;