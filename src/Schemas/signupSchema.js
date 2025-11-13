import {z } from 'zod'


export const userschema=z.string().min(2,{message:"username atleast 2 char"}).max(20,{message:"not more then 20 char"})

export const signupSchema=z.object({
    username:userschema,
    email:z.email({message:"invalid email Address"}),
    password:z.string().trim().min(8,{message:"min eight length password"})
})
