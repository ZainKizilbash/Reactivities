import { Box, Container, CssBaseline } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
      .then(response => setActivities(response.data))
  }, [])           //run only once on mount

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id));
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
    <Box sx={{ bgcolor: '#eeeeee' }}>
      {/* this stretches the navbar all the way to the top and left and right aswell*/}
      <CssBaseline />
      <Navbar openForm={hanldeOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={hanldeCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={hanldeOpenForm}
          closeForm={handleFormClose}
        />
      </Container>
    </Box>
  )
}

export default App
