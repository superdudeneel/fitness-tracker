import React from 'react'
import {useState} from 'react';
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
function Forgot() {
    const [email, setemail] = useState('');
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/forgotpass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ email })
        })
        const result = await response.json();
        if(!result.success){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: result.message,
                showConfirmButton: true,
                confirmButtonText: 'Try Again',
                showCloseButton: true,
            });
        }
        else{
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: result.message,
                showConfirmButton: true,
                timer: 1100,
                confirmButtonText: 'Ok',
                showCloseButton: true,
            })
        }
    }
  return (
    <section className="bg-gray-50">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      
      <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md dark:border-gray-700 sm:p-8">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Forgot your password?
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">Don't fret! Just type in your email and we will send you a Link to reset your password!</p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit = {handlesubmit}>
              <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" 
                  value = {email} 
                  onChange = {(e)=>{
                    setemail(e.target.value)
                  }}
                  />
              </div>
              
              <button type="submit" className="w-full text-white bg-gradient-to-r from-emerald-500 to-teal-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">Send Email</button>
          </form>
      </div>
  </div>
</section>
  )
}

export default Forgot