import React, { useContext } from 'react'
import Style from './Register.module.css'
import { useState , useEffect} from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import userContext from '../../context/UserContext'

export default function Register() {
  let {setToken} = useContext(userContext)
  const [errorApi, seterrorApi] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  let navigate = useNavigate()


  let validationSchema= Yup.object().shape({
    firstName: Yup.string().required('First name is required').min(2, 'First name must be at least 2 characters long'),
    lastName: Yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters long'),  
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string().required('Confirm password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
    phone: Yup.string().required('Phone number is required').matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, 'Phone number must be in the format 123-456-7890')
  })

  let formikRegister = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    },
    onSubmit: submitForm,
    validationSchema,
    
  })



  async function  submitForm (values) {

    setisLoading(true)
    console.log(values)
    axios.post('http://localhost:5000/api/register', values)
    .then((response) => {
      console.log(response.data)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token)
        setToken(response.data.token)
        setisLoading(false)
        navigate('/')
      }
    }).catch((error) => {
      console.log(error.response.data)
      if (error.response.data.message) {
        seterrorApi(error.response.data.message)
        setisLoading(false)
      }
    }
    ).finally(() => {
      setisLoading(false)
    })
  }

  return <>

   { errorApi? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {errorApi}
  </div> : null } 

<form onSubmit={formikRegister.handleSubmit} className="max-w-md  my-2">
<div className="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
        <input
        onChange={formikRegister.handleChange}
        value={formikRegister.values.firstName}
        onBlur={formikRegister.handleBlur}
        type="text" name="firstName" id="firstName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label htmlFor="firstName" className="peer-focus:font-medium absolute start-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    { formikRegister.errors.firstName && formikRegister.touched.firstName ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formikRegister.errors.firstName}
  </div> : null } 
  

    <div className="relative z-0 w-full mb-5 group">
        <input
         onChange={formikRegister.handleChange}
         value={formikRegister.values.lastName}
         onBlur={formikRegister.handleBlur}
         type="text" name="lastName" id="lastName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label htmlFor="lastName" className="peer-focus:font-medium absolute start-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>

    { formikRegister.errors.lastName && formikRegister.touched.lastName ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formikRegister.errors.lastName}
  </div> : null } 
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input 
       onChange={formikRegister.handleChange}
       value={formikRegister.values.email}
       onBlur={formikRegister.handleBlur}
      type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium absolute start-0  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  
  { formikRegister.errors.email && formikRegister.touched.email ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formikRegister.errors.email}
  </div> : null } 

  <div className="relative z-0 w-full mb-5 group">
      <input
       onChange={formikRegister.handleChange}
       value={formikRegister.values.password}
       onBlur={formikRegister.handleBlur}
       type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium absolute start-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>

  
  { formikRegister.errors.password && formikRegister.touched.password ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formikRegister.errors.password}
  </div> : null } 


  <div className="relative z-0 w-full mb-5 group">
      <input 
       onChange={formikRegister.handleChange}
       value={formikRegister.values.confirmPassword}
       onBlur={formikRegister.handleBlur}
      type="password" name="confirmPassword" id="confirmPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="confirmPassword" className="peer-focus:font-medium absolute start-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>

  { formikRegister.errors.confirmPassword && formikRegister.touched.confirmPassword ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formikRegister.errors.confirmPassword}
  </div> : null } 

  <div className="relative z-0 w-full mb-5 group">
        <input
         onChange={formikRegister.handleChange}
         value={formikRegister.values.phone}
         onBlur={formikRegister.handleBlur}
         type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
        <label htmlFor="phone" className="peer-focus:font-medium absolute start-0 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
    </div>

    { formikRegister.errors.phone && formikRegister.touched.phone ? 
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Error!</span> {formikRegister.errors.phone}
  </div> : null } 


  <button 
    disabled={!formikRegister.isValid || !formikRegister.dirty ? true : false}
    type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
    {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Register'} 
    </button>
</form>
  
  </>
}
