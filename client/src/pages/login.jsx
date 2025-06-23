import React from 'react'
import { useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  

  const handlesubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if(!data.success){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
        showConfirmButton: true,
        confirmButtonText: 'Try Again',
        showCloseButton: true,
      });
    }else{
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: data.message,
        showConfirmButton: true,
        timer: 1100,
        confirmButtonText: 'Ok',
        showCloseButton: true,
      }).then(() => {
        window.location.href = data.redirect;
      })
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit = {handlesubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value = {username}
                  onChange = {(e)=>{
                    setusername(e.target.value);
                  }}
                  required
                  
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to = '/forgot-pass' className="font-semibold text-gray-600 hover:text-teal-600">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value = {password}
                  onChange = {(e)=>{
                    setpassword(e.target.value);
                  }}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                onClick = {handlesubmit}
                type="submit"
                className="flex cursor-pointer w-full justify-center rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <Link to = '/signup' className="font-semibold text-gray-600 hover:text-teal-600">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login