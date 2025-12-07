import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useParams } from "react-router";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { activitySchema, type ActivitySchema } from "../../../lib/schemas/activitySchema";
import { zodResolver } from '@hookform/resolvers/zod';

export default function ActiviyForm() {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });            //react-hook-form built in
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

    useEffect(() => {
        if (activity) reset(activity);
    }, [activity, reset]);

    const onSubmit = (data: ActivitySchema) => {
        console.log(data)
    }

    if (isLoadingActivity) return <Typography>Loading...</Typography>
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit activity' : 'Create activity'}
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
                <TextField {...register('title')}
                    label='Title'
                    defaultValue={activity?.title}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                />
                <TextField {...register('description')} label='Description' multiline rows={3} defaultValue={activity?.description} />
                <TextField {...register('category')} label='Category' defaultValue={activity?.category} />
                <TextField {...register('date')} label='Date' type="date"
                    defaultValue={activity?.date
                        ? new Date(activity.date).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]}
                />
                <TextField {...register('city')} label='City' defaultValue={activity?.city} />
                <TextField {...register('venue')} label='Venue' defaultValue={activity?.venue} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color='inherit'>Cancel</Button>
                    <Button
                        type="submit"
                        color='success'
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}