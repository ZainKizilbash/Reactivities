import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Fragment } from "react/jsx-runtime";

export default function ActivityList() {
    const { activitiesGroup, isLoading } = useActivities();
    if (isLoading) return <Typography>Loading...</Typography>

    if(!activitiesGroup) return <Typography>No activites found</Typography>

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {activitiesGroup.pages.map((activities, index) =>  (
                <Fragment key={index}>
                    {activities.items.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                        />
                    ))}
                </Fragment>
            ))}
        </Box>
    )
}