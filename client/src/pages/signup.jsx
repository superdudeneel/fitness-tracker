import React, { use } from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {Activity} from 'lucide-react'
function Signup() {
    const [username, setusername] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');

    const handlesubmit = async (e)=>{
        e.preventDefault();
        const payload = {
            username,
            email,
            password
        }
        const response = await fetch('http://localhost:5000/api/signup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        const data = await response.json();
        if(!data.success){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
                showConfirmButton: true,
                confirmButtonText: 'Try Again',
                showCloseButton: true,


            })
        }
        else{
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: data.message,
                showConfirmButton: true,
                timer: 1100,
                confirmButtonText: 'Ok',
                showCloseButton: true,
            }).then((result) => {
                window.location.href = '/login';
            })
        }

    }
  return (
    <>
      
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Register an account with us
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
                    setusername(e.target.value)
                  }}
                  required
                  
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>

              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value = {email}
                  onChange = {(e)=>{
                    setemail(e.target.value)
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value = {password}
                  onChange = {(e)=>{
                    setpassword(e.target.value)
                  }}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick = {handlesubmit}
                className="flex cursor-pointer w-full justify-center rounded-md bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-teal-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account{' '}
            <Link to = '/login' className="font-semibold text-gray-600 hover:text-teal-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup