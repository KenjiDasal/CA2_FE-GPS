import axios from 'axios'; // Importing axios for making HTTP requests
import { useState } from 'react'; // Importing useState hook from React
import { TextInput, StyleSheet, Button, Text } from 'react-native'; // Importing TextInput, StyleSheet, Button, and Text components from React Native
import { useRouter } from 'expo-router'; // Importing useRouter from expo-router
import { useSession } from '../../../contexts/AuthContext'; // Importing useSession from AuthContext
import { GenreType } from '../../../types'; // Importing GenreType from types

// Define the Page component
export default function Page() {
  const { session, isLoading } = useSession(); // Get the session and isLoading state from useSession hook
  const [error, setError] = useState(''); // Initialize state variable 'error' as an empty string
  const router = useRouter(); // Get the router from useRouter hook

  const [form, setForm] = useState<GenreType>({
    name: ''
  }); // Initialize state variable 'form' as an empty GenreType object with a 'name' property

  if (isLoading) return <Text>Loading...</Text>; // If isLoading is true, render "Loading..." text

  // Handle input change
  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value, // Update the 'form' state with the new value
    }));
  };

  // Handle form submission
  const handleClick = () => {
    console.log(form); // Log the form data

    axios
      .post(`https://ca-1-paintings.vercel.app/api/museums/`, form, {
        headers: {
          Authorization: `Bearer ${session}`, // Include the session token in the request headers
        },
      })
      .then((response) => {
        console.log(response.data); // Log the response data
        router.push(`/genres/${response.data._id}`); // Navigate to the newly created genre page
      })
      .catch((e) => {
        console.error(e); // Log any errors
        setError(e.response.data.message); // Set the 'error' state with the error message from the response
      });
  };

  return (
    <>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChange={handleChange} // Handle input change event
        value={form.name} // Set the input value to the 'name' property of the 'form' state
        id="name"
      />

      <Text>{error}</Text> {/* Render the error message, if any */}

      <Button
        onPress={handleClick} // Handle button click
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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