import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { login } from "../feature/authSlice"
import Button from "./Button"
import Input from "./Input"
import { useState } from "react"
import Logo from "./Logo"

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState('')
    const {register,handleSubmit}  = useForm()

    const create = async(data) => {
        setError("")

        try {
           const userData = await authService.createAccount(data)

           if(userData) {
           const userData= await authService.currentStatus()
                if(userData) dispatch(login(userData))
                navigate('/')
           } }
            catch (error) {
            setError(error.message)
        }
    }


return (
<div className="flex items-center justify-center">
<div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
<div className="mb-2 flex justify-center">
<span className="inline-block w-full max-w-100px">
    <Logo width="100%" />
</span>
</div>
<h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
<p className="mt-2 text-center text-base text-black/60">
Already have an account?&nbsp;
<Link
    to="/login"
    className="font-medium text-primary transition-all duration-200 hover:underline"
>
    Sign In
</Link>
</p>
{error && <p className="text-red-600 mt-8
text-center">
{error}
</p>}
    <form onSubmit={handleSubmit(create)}>
<Input
placeholder="Enter your name"
label="Name: "
{...register("Name",{
    required : "enter your name"
})}  />

<Input
    label = "Email"
    placeholder = "abc@gmail.com"
    type='email'
    {...register("email" , {
    required:"email is required",
    pattern:{value:/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "email must be valid"

    } })}  />

<Input
    label = "Password"
    placeholder="enter your password"
    type='password'
    {...register("password", {
        required: "password must be required",
        minLength:{
            value:8,
            message:"password must be 8 character"
        },
        // pattern:{
        //     value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
        //     message: "Password must contain at least 1 number and 1 special character"
        // }
    })}/>
    <Button type='Submit' className='w-full'>                     
                     Sign up 
     </Button>
    </form>
</div>
</div>
)}

export default Signup