import { CssBaseline, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:5001/api/activities')
    .then(response => setActivities(response.data))
  },[])           //run only once on mount
  return (
    <>
      {/* this stretches the navbar all the way to the top and left and right aswell*/}
      <CssBaseline/>          
      <Navbar/>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default App
