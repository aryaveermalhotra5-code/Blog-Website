import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../feature/authSlice'
import Button from './Button'
import Input from './Input'
import { useState } from 'react'
import Logo from './Logo'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError('')
    try {
      const account = await authService.createAccount(data)
      if (account) {
        const userData = await authService.currentStatus()
        if (userData) dispatch(login(userData))
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
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-500">
          Already have an account?&nbsp;
          <Link to="/login" className="font-medium text-blue-600 transition hover:underline">
            Sign In
          </Link>
        </p>

        {error && <p className="mt-6 text-center text-sm text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              placeholder="Enter your name"
              label="Name"
              {...register('Name', { required: 'enter your name' })}
            />
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
                minLength: { value: 8, message: 'password must be 8 characters' },
              })}
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup