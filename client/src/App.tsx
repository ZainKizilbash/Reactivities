import { useEffect, useState } from "react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/activities')
    .then(response => response.json())
    .then(data => setActivities(data))
  },[])           //run only once on mount
  return (
    <div>
      <h3>Reactivities</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
