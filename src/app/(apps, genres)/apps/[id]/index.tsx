import axios from 'axios'; // Import axios for making HTTP requests
import { useEffect, useState } from 'react'; // Import useEffect and useState hooks for managing state and side effects
import { Text } from 'react-native'; // Import Text component from React Native
import { useLocalSearchParams } from 'expo-router'; // Import useLocalSearchParams hook from expo-router
import { useSession } from '../../../../contexts/AuthContext'; // Import useSession hook from AuthContext

// Define the Page component
export default function Page() {
  const { session, isLoading } = useSession(); // Get the user session and loading status from AuthContext
  const [apps, setApps] = useState<any>(null); // Initialize state variable for apps data
  const [error, setError] = useState(""); // Initialize state variable for error
  const { id } = useLocalSearchParams(); // Get the apps ID from the URL using useLocalSearchParams hook

  // Fetch apps details on component mount
  useEffect(() => {
    axios.get(`https://ca-google-play-store-main-csysgj3ns-kenji-dasals-projects.vercel.app/api/apps/${id}`, {
      headers: {
        Authorization: `Bearer ${session}` // Include user session token for authorization
      }
    })
      .then(response => {
        console.log(response.data); // Log the retrieved data
        setApps(response.data); // Update the app state with retrieved data
      })
      .catch(e => {
        console.error(e); // Log any errors
        setError(e.response.data.message); // Set error state with error message
      });
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  if (isLoading) return <Text>Loading...</Text>; // Display loading message if session is still loading

  if (!apps) return <Text>{error}</Text>; // Display error message if apps data is not available

  return (
    <>
      <Text>{apps.title}</Text> {/* Display the apps title */}
      <Text>{error}</Text> {/* Display the error message */}
    </>
  );
}