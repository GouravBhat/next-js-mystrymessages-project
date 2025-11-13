import { Content } from "next/font/google";
import z from "zod";


export const messageSchema=z.object({
    content:z.string().min(10,{message:"minium 10 char"}).max(300,{message:"max 10 char"})
})