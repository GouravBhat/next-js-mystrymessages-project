import {z} from 'zod'

export const acceptmessagesSchema=z.object({
    isacceptingmessages:z.boolean()
})