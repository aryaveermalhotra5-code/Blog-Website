import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login as authlogin } from '../feature/authSlice'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useState } from 'react'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')

  const login = async (data) => {
    setError('')
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.currentStatus()
        if (userData) dispatch(authlogin(userData))
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex w-full items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-500">
          Don&apos;t have any account?&nbsp;
          <Link to="/signup" className="font-medium text-blue-600 transition hover:underline">
            Sign Up
          </Link>
        </p>

        {error && <p className="mt-6 text-center text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="abc@gmail.com"
              type="email"
              {...register('email', {
                required: 'email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'email must be valid',
                },
              })}
            />
            <Input
              label="Password"
              placeholder="enter your password"
              type="password"
              {...register('password', {
                required: 'password must be required',
              })}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login