import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {useState, useEffect} from 'react'
import Swal from 'sweetalert2';

import React from 'react'
export default function Completeprofile() {
    const [user, setuser] = useState({
        username: 'developer',
        email: 'dev@gmail.com',

    })

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [weight, setweight] = useState('');
    const [calorieintake, setcalorieintake] = useState('');
    const [calorieburn, setcalorieburn] = useState('');
    const [height, setheight] = useState('');
    const [waterintake, setwaterintake] = useState('');

    async function updateuser(e){
        e.preventDefault();

        const payload = {
            firstname:firstname,
            lastname: lastname,
            weight:weight,
            height: height,
            calorieintake:calorieintake,
            calorieburn: calorieburn,
            waterintake: waterintake,

        }
        const response = await fetch('http://localhost:5000/api/update', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
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
                    confirmButtonText: 'Ok',
                    showCloseButton: true,
                  })
        }
    }

    async function loaduserdata(){
        const response = await fetch('http://localhost:5000/api/load', {
          method: 'GET',
          credentials:'include',
        })
        const result = await response.json();
        if(result.success){
          const User = result.user;
          setfirstname(User.Firstname);
          setlastname(User.Lastname);
          setweight(User.weight);
          setheight(User.height);
          setcalorieintake(User. calorieintakeperday);
          setcalorieburn(User.calorieburnperday)
          setwaterintake(User.waterintakeperday);

        }
    }

    useEffect( ()=>{
        async function fetchdata(){
            const response = await fetch('http://localhost:5000/api/dashboard', {
                method: 'GET',
                credentials: 'include',

            })
            const data = await response.json()
            if(data.success){
                setuser({
                    username: data.user.username,
                    email: data.user.email,
                })
            }
        }
        fetchdata();
        loaduserdata();

    }, [])
  return (
    <form onSubmit = {updateuser}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-teal-600">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value = {user.username}
                    readOnly
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  value = {firstname}
                  onChange = {(e)=>{
                    setfirstname(e.target.value);
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  value = {lastname}
                  onChange = {(e)=>{
                    setlastname(e.target.value);
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value = {user.email}
                  readOnly
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                Current Weight(Kg)
              </label>
              <div className="mt-2 grid grid-cols-1">

                <input
                  id="weight"
                  name="weight"
                  type="text"
                  
                  value = {weight}
                  onChange = {(e)=>{
                    setweight(e.target.value);
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
                
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                Daily Calorie intake target(cal)
              </label>
              <div className="mt-2">
                <input
                  id="street-address"
                  name="street-address"
                  type="text"
                  value = {calorieintake}
                  onChange = {(e)=>{
                    setcalorieintake(e.target.value);
                  }}
                  className="block w-140 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                Daily water intake target(glasses)
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  value = {waterintake}
                  onChange = {(e)=>{
                    setwaterintake(e.target.value);
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                Calorie burn goal/day
              </label>
              <div className="mt-2">
                <input
                  id="region"
                  name="region"
                  type="text"
                  value = {calorieburn}
                  onChange = {(e)=>{
                    setcalorieburn(e.target.value);
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                Height(cm)
              </label>
              <div className="mt-2">
                <input
                  id="postal-code"
                  name="postal-code"
                  type="text"
                  value = {height}
                  onChange = {(e)=>{
                    setheight(e.target.value);
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"

          className="rounded-md cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-teal-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}


