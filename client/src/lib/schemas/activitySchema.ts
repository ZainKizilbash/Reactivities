import {z} from 'zod';

const requiredString = (fieldName: string) =>z.string().nonempty({message: `${fieldName} is required.`})
    .min(1, {message: `${fieldName} is required.`})
export const activitySchema = z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: requiredString('Date'),
    city: requiredString('City'),
    venue: requiredString('Venue'),

})

export type ActivitySchema = z.infer<typeof activitySchema>;