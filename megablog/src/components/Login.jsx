import { useForm } from 'react-hook-form'
import { Link , useNavigate } from 'react-router-dom'
import {login as authlogin } from '../feature/authSlice'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useState } from 'react'


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
          const session =  await authService.login(data)

          if(session) {
            const userData = await authService.currentStatus()
            if (userData) dispatch (authlogin(userData))
                navigate('/')
          } }
          
          catch (error) {
            setError(error.message)
        }
    }

return (
<div className='flex items-center justify-center w-full'>
<div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border 
border-black/10`}>
    <div className="mb-2 flex justify-center">
        <span  className="inline-block w-full  {`max-w-100px`} ">
            <Logo width='100%'/>
        </span>
    </div>
<h2 className="text-center text-2xl font-bold
    leading-tight">Sign in to your account</h2>
    <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
                to="/signup"
                className="font-medium text-primary transition-all duration-200 hover:underline"
            >
                Sign Up
            </Link>
</p>
    {error && <p className='text-red-600 mt-8 text-center'>
        {error}</p>}

        <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                <Input
                    label = "Email"
                    placeholder = "abc@gmail.com"
                    type='email'
                    {...register("email" , {
                    required:"email is required",
                    pattern:{value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "email must be valid"

                    }

                    })}
                />

                <Input
                    label = "Password"
                    placeholder="enter your password"
                    type='password'
                    {...register("password", {
                        required: "password must be required",
                        // minLength:{
                        //     value:8,
                        //     message:"password must be 8 character"
                        // },
                        // pattern:{
                        //     value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
                        //       message: "Password must contain at least 1 number and 1 special character"
                        // }
                    })}/>

                    <Button type='Submit'  className='w-full' >                     
                     Sign in </Button>
                </div>
        </form>
</div>
</div>
)
}

export default Login