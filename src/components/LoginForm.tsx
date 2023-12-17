import { TextInput, StyleSheet, Button, Text } from 'react-native'; // Import necessary components from react-native
import { useState } from 'react'; // Import the useState hook from react
import axios from 'axios'; // Import Axios for making HTTP requests
import { useSession } from '../contexts/AuthContext'; // Import the useSession hook from the AuthContext
import { LoginFormType } from '../types'; // Import the LoginFormType from the types file

export default function LoginForm() { // Define the LoginForm component
    const { signIn } = useSession(); // Destructure the signIn function from the useSession hook

    const [form, setForm] = useState<LoginFormType>({ // Initialize form state using the LoginFormType
        email: "", // Set the initial email value to an empty string
        password: "" // Set the initial password value to an empty string
    });
    const [error, setError] = useState(""); // Initialize the error state with an empty string

    const handleChange = (e: any) => { // Define the handleChange function to update the form state
        setForm(prevState => ({ // Update the form state with the new values
            ...prevState, // Spread the previous state
            [e.target.id]: e.target.value // Update the specific property based on the event target's id and value
        }));
    };

    const handleClick = () => { // Define the handleClick function to handle form submission
        console.log("clicked", form); // Log the form data to the console

        axios.post('https://festivals-api.vercel.app/api/users/login', form) // Make a POST request to the login endpoint
             .then(response => { // Handle the successful response
                console.log(response.data); // Log the response data to the console
                signIn(response.data.token); // Call the signIn function with the token from the response
             })
             .catch(e => { // Handle any errors
                setError(e.response.data.message); // Set the error state with the error message from the response
             });
    };

    return ( // Render the component's UI
        <>
            <TextInput // Render a TextInput for the email input
                style={styles.input} // Apply the specified styles
                placeholder='Email' // Set the placeholder text
                onChange={handleChange} // Handle the change event with the handleChange function
                value={form.email} // Bind the value to the email property of the form state
                id="email" // Set the id of the input
            />
            <TextInput // Render a TextInput for the password input
                style={styles.input} // Apply the specified styles
                placeholder='Password' // Set the placeholder text
                onChange={handleChange} // Handle the change event with the handleChange function
                value={form.password} // Bind the value to the password property of the form state
                id="password" // Set the id of the input
            />
            <Text>{error}</Text> // Display the error message, if any
            <Button // Render a Button for submitting the form
                onPress={handleClick} // Handle the press event with the handleClick function
                title="Submit" // Set the title of the button
                color="#28f8b4" // Set the color of the button
                accessibilityLabel="Learn more about this purple button" // Set the accessibility label for the button
            />
        </>
    );
}

const styles = StyleSheet.create({ // Define the styles for the component
    input: { // Specify the styles for the input fields
        height: 40, // Set the height of the input
        margin: 12, // Set the margin of the input
        borderWidth: 1, // Set the border width of the input
        padding: 10, // Set the padding of the input
    },
});