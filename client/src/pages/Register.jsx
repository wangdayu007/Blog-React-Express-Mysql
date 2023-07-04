import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [inputs, setInputs] = useState({
    username:'',
    email:'',
    password:''
  })
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev =>({
      ...prev, [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    try {
      await axios.post("/api/auth/register", inputs)
      navigate("/login")
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>Register</h1>
      <form action="">
        <input required type="text" name="username" placeholder='username' onChange={handleChange}/>
        <input required type="email" name="email" placeholder='email' onChange={handleChange} />
        <input required type="password" name="password" placeholder='password' onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Don you have an account? <Link to={'/login'}>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
