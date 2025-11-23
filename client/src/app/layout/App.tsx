import { Box, Container, CssBaseline, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await axios.get<Activity[]>('https://localhost:5001/api/activities');
      return response.data;
    }
  })
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

  const handleSubmitForm = (activity: Activity) => {
    // if (activity.id) {
    //   setActivities(activities.map(x => x.id == activity.id ? activity : x))
    // } else {
    //   const newActivity = { ...activity, id: activities.length.toString() }
    //   setSelectedActivity(newActivity);
    //   setActivities([...activities, newActivity])
    // }

    console.log(activity);
    setEditMode(false)
  }

  const handleDelete = (id: string) => {
    // setActivities(activities.filter(x => x.id !== id))
    console.log(id);
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
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
            submitForm={handleSubmitForm}
            deleteActivity={handleDelete}
          />
        )}

      </Container>
    </Box>
  )
}

export default App
