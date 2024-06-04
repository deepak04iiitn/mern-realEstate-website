import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';              /* using this hook we can dispatch the functions that we have */
import { signInStart , signInSuccess , signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {

  const [formData , setFormData] = useState({});       /* whenever somethings value changes , we use state to keep track of all the changes */

  const { loading , error } = useSelector((state) => state.user);

  /* const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); */


  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
      setFormData(
        {
           ...formData,                                /* we are keeping track of previous information entered by using spread operator , so that we dont loose the previous input information once user enters tha value for other input */
           [e.target.id] : e.target.value,             /* whatever is changing set that one to its value */
        }
      )
  }


  const handleSubmit = async (e) => {
      e.preventDefault();                              /* to prevent the refreshing of page when we submit */

      try {
        
          dispatch(signInStart());                       /* starting the loading  , setLoading(true) */
          const res = await fetch('/api/auth/signin' , 
          {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json',       /* sending the form data by converting it to string , whenever anyone clicks on submit button */
            },
            body : JSON.stringify(formData),
          }
        );
        const data = await res.json();                   /* converting the response we get into json */
        console.log(data);
        if(data.success === false) 
          {
            dispatch(signInFailure(data.message));
            return;
          }

          dispatch(signInSuccess(data));
          /* setLoading(false); */                              /* here bcz the loading is completed */
          /* setError(null); */

          navigate('/');

      } catch (error) {

          dispatch(signInFailure(error.message));

          /* setLoading(false);
          setError(error.message); */
      }

  };


  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          
          <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
          <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

          <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
              { loading ? 'Loading...' : 'Sign In' }
          </button>
          <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700 '>Sign up</span>
        </Link>
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}
