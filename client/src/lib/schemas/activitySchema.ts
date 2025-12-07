import {z} from 'zod';

export const activitySchema = z.object({
    title: z.string().nonempty('Title is required')
        .min(1, {message: 'Title is required'})
})

export type ActivitySchema = z.infer<typeof activitySchema>;