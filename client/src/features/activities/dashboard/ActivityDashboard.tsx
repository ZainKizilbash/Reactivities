import { Button, Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {
    const { isFetchingNextPage, fetchNextPage, hasNextPage } = useActivities();

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={8}>
                <ActivityList />
                <Button
                    onClick={() => fetchNextPage}
                    sx={{my: 2, float: 'right'}}
                    variant="contained"
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    Load more
                </Button>
            </Grid2>
            <Grid2 size={4}>
                <ActivityFilters />
            </Grid2>
        </Grid2>
    )
}