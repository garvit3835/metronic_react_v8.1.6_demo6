import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Form from '../components/form'
// import List from '../components/list'

export default function Employees({setData}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  // const [page, setPage] = useState(0)
  // const [nextbtn, setNextbtn] = useState()
  // const [pageSize, setPageSize] = useState(3)
  const handleSignin = async (event) => {
    event.preventDefault()
    if (email === 'root@root' && password === 'root') {
      navigate('/employees/root')
    } else {
      const data = {
        email: email,
        password: password,
      }
      const res = await axios.post(`http://localhost:5000/api/employees/authenticate`, data)
      if (res.data) {
        await setData(res.data)
        navigate('/employees/profile')
      } else {
        toast.error('Incorrect Credentails', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      }
    }
  }

  return (
    <div className='mt-20'>
      <form className='w-50 mx-auto' onSubmit={handleSignin}>
        <div className='form-outline mb-4'>
          <input
            type='email'
            id='form2Example1'
            className='form-control'
            placeholder='Email address'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='form-outline mb-4'>
          <input
            type='password'
            id='form2Example2'
            className='form-control'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-primary btn-block mb-4 w-100'>
          Sign in
        </button>

        <div className='text-center'>
          <div>
            Not a member? <a href='employees/register'>Register</a>
          </div>
        </div>
      </form>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </div>
  )
}
