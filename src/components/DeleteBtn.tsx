import React from 'react'; 
import axios from 'axios'; 
import { Button } from 'react-native'; 
import { useSession } from '../contexts/AuthContext'; 
import { useState } from 'react'; 

interface DeleteBtnProps { // Define the DeleteBtnProps interface for the component's props
  resource: string; // Specify the resource property as a string
  id: string; // Specify the id property as a string
  deleteCallback?: (id?: string) => void; // Optional deleteCallback function that takes an id as a parameter and returns void
}

export default function DeleteBtn({ // Define the DeleteBtn component with the specified props
  resource, // Destructure the resource prop
  id, // Destructure the id prop
  deleteCallback, // Destructure the deleteCallback prop
}: DeleteBtnProps) {
  const [deleting, setDeleting] = useState(false); // Initialize the deleting state and its setter function with the useState hook
  const { session } = useSession(); // Get the session object from the useSession hook
  const handleDelete = () => { // Define the handleDelete function to handle the delete action
    axios // Make an HTTP DELETE request using axios
      .delete(`https://ca-google-play-store-main-csysgj3ns-kenji-dasals-projects.vercel.app/api/${resource}/${id}`, { // Specify the URL for the DELETE request with the resource and id
        headers: { // Provide the authorization header with the session token
          Authorization: `Bearer ${session}`, // Set the Authorization header with the session token
        },
      })
      .then((response) => { // Handle the successful response from the DELETE request
        console.log(response.data); // Log the response data to the console
        if (deleteCallback) { // Check if the deleteCallback function is provided
          deleteCallback(id); // Call the deleteCallback function with the id as a parameter
        }
      })
      .catch((e) => { // Handle any errors from the DELETE request
        console.error(e); // Log the error to the console
      });
  };
  return ( // Return the Button component with the specified props
    <Button
      title={deleting ? 'Deleting...' : 'Delete'} // Set the title of the button based on the deleting state
      onPress={handleDelete} // Call the handleDelete function when the button is pressed
      color="#ff0000" // Set the color of the button to red
    />
  );
}