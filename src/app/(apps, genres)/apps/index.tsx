import { useEffect, useState } from 'react'; // Importing useEffect and useState hooks from React
import axios from 'axios'; // Importing axios for making HTTP requests
import { Text, FlatList, Button } from 'react-native'; // Importing Text, FlatList, and Button components from React Native
import { Link, useRouter } from 'expo-router'; // Importing Link and useRouter from expo-router
import AppItem from '../../../components/AppItem'; // Importing the AppItem component


export default function Page() {
  const [apps, setApps] = useState([]); // Initialize state variable 'apps' as an empty array

  // Fetch apps data on component mount
  useEffect(() => {
    axios.get('https://ca-google-play-store-main-csysgj3ns-kenji-dasals-projects.vercel.app/api/')
      .then(response => {
        console.log(response.data); // Log the retrieved data
        setApps(response.data); // Update the 'apps' state with the retrieved data
      })
      .catch(e => {
        console.error(e); // Log any errors
      });
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  // Define a function to handle app deletion
  const onDelete = (id: string) => {
    let newApps = apps.filter((app: any) => app._id !== id); // Filter out the app with the specified ID
    setApps(newApps); // Update the 'apps' state with the filtered apps
  }

  let appsList = apps.map((app: any) => {
    return <AppItem key={app._id} app={app} onDelete={onDelete} />; // Render an <link>AppItem</link> component for each app
  });

  return (
    <>
      {appsList} {/* Render the list of <link>AppItem</link> components */}
      {/* Example of using the <link>Link</link> component to navigate to different festival pages */}
      {/* <link>Link</link> href={{ pathname: '/festivals/[id]', params: { id: '235641726gfjwhgvfuwf' }}>This is festival 1</link> */}
      {/* <link>Link</link> href={{ pathname: '/festivals/[id]', params: { id: 'secondblahblah8753842' }}>Second festival</link> */}
      {/* <link>Link</link> href={{ pathname: '/festivals/[id]', params: { id: '33333333333' }}>Cool festival</link> */}
    </>
  );
}