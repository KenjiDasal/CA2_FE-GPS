// Import necessary modules
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSession } from '../../../../contexts/AuthContext';
import { AppType } from '../../../../types';

// Define the Page component
export default function Page() {
  // Get the user session and loading status from AuthContext
  const { session, isLoading } = useSession();
  // Initialize state variables for apps data and error
  const [apps, setApps] = useState<any>(null);
  const [error, setError] = useState("");
  // Get the apps ID from the URL
  const { id } = useLocalSearchParams();
  // Get the router for navigation
  const router = useRouter();

  // Initialize form state for updating apps details
  const [form, setForm] = useState<AppType>({
    title: "",
    type: "",
    price: "",
    start_date: "",
    end_date: ""
  });

  // Fetch apps details on component mount
  useEffect(() => {
    // Make a GET request to fetch apps details
    axios.get(`https://ca-google-play-store-main-csysgj3ns-kenji-dasals-projects.vercel.app/api/apps/${id}`, {
      headers: {
        Authorization: `Bearer ${session}` // Include user session token for authorization
      }
    })
      .then(response => {
        console.log(response.data); // Log the retrieved data
        setApps(response.data); // Update the apps state with retrieved data
        setForm(response.data); // Update the form state with retrieved data
      })
      .catch(e => {
        console.error(e); // Log any errors
        setError(e.response.data.message); // Set error state with error message
      });
  }, []);

  // Display loading message if session is still loading
  if (isLoading) return <Text>Loading...</Text>;

  // Display error message if apps data is not available
  if (!apps) return <Text>{error}</Text>;

  // Function to handle form field changes
  const handleChange = (e: any) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value // Update the form state based on user input
    }));
  };

  // Function to handle form submission for updating apps details
  const handleClick = () => {
    console.log(form); // Log the form data

    // Make a PUT request to update apps details
    axios.put(`https://ca-google-play-store-main-csysgj3ns-kenji-dasals-projects.vercel.app/api/apps/${id}`, form, {
      headers: {
        Authorization: `Bearer ${session}` // Include user session token for authorization
      }
    })
      .then(response => {
        console.log(response.data); // Log the response data
        router.push(`/apps/${id}`); // Navigate to the updated apps details page
      })
      .catch(e => {
        console.error(e); // Log any errors
        setError(e.response.data.message); // Set error state with error message
      });
  };

  // Render form fields for updating apps details
  return (
    <>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        placeholder='Title'
        onChange={handleChange}
        value={form.title}
        id="title"
      />

      <Text>Type</Text>
      <TextInput
        style={styles.input}
        placeholder='Type'
        onChange={handleChange}
        value={form.type}
        id="type"
      />

      <Text>Price</Text>
      <TextInput
        style={styles.input}
        placeholder='Price'
        onChange={handleChange}
        value={form.price}
        id="price"
      />

      <Button title="Update" onPress={handleClick} /> {/* Button to submit the form for updating festival details */}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});