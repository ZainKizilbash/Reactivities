import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id));
  }

  const hanldeCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }

  const hanldeOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else hanldeCancelSelectActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }


  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      {/* this stretches the navbar all the way to the top and left and right aswell*/}
      <CssBaseline />
      <Navbar openForm={hanldeOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography>Loading....</Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={hanldeCancelSelectActivity}
            selectedActivity={selectedActivity}
            editMode={editMode}
            openForm={hanldeOpenForm}
            closeForm={handleFormClose}
          />
        )}

      </Container>
    </Box>
  )
}

export default App
