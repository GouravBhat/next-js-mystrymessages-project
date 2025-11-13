import z from "zod";


export const verifySchema=z.object({

    
    otp:z.string().length(6,'verification must be 6 digits')
})