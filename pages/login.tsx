import Head from 'next/head'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Logo } from '../components/Logo'
import useAuth from '../hooks/useAuth';

interface Inputs {
  email: string
  password: string
}

function Login() {
  const [login, setLogin] = useState(false)
  const { signUp, signIn } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Login - Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Logo />
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      <form
        className='
          relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6
          md:mt-0 md:max-w-md md:px-14
        '
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-4xl font-semibold'>Sign In</h1>
        <div className='space-y-4'>
          <label className='w-full inline-block'>
            <input
              type="email" placeholder='Email' className='input'
              {...register('email', { required: true })}
            />
            { errors.email && <p className='text-red-600 p-1 text-[13px] font-light'>We beg you to enter a valid email</p> }
          </label>
          <label className='w-full inline-block'>
            <input
              type="password" placeholder='Password' className='input'
              {...register('password', { required: true, minLength: 4 })}
            />
            { errors.password && <p className='text-red-600 p-1 text-[13px] font-light'>We beg you to enter at least a 4 characters long password</p> }
          </label>
        </div>
        
        <button
          type='submit'
          className='w-full rounded bg-[#e50914] py-3 font-semibold'
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix ?{" "}
          <button
            type='submit'
            className='text-white hover:underline'
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login