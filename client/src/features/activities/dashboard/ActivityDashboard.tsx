import { Grid2, Typography } from "@mui/material";
import ActivityList from "./ActivityList";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
    const { activities, isPending } = useActivities();

    if (!activities || isPending) return <Typography>Loading...</Typography>

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityList />
            </Grid2>
            <Grid2 size={4}>
                <ActivityFilters />
            </Grid2>
        </Grid2>
    )
}