import { Text, View, Button } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './DeleteBtn';

interface MyProps {
  genres: { // Specify the genres property as an object with _id and name properties
    _id: string; // Defined the _id property as a string
    name: string; // Defined the name property as a string
  };
  onDelete?: (id?: string) => void; // Optional onDelete function that takes an id as a parameter and returns void
}

export default function GenreItem({ genres, onDelete }: MyProps) { // Define the GenreItem component with the specified props
  const router = useRouter(); // Get the router object from the useRouter hook
  return ( // Render the component's UI
    <View> // Use the View component to create a container for the UI components
      <Link // Use the Link component to create a navigable link
        href={{ // Provide the href for the Link component
          pathname: '/genres/[id]', // Specify the pathname for the link
          params: { id: genres._id }, // Pass the genre's _id as a parameter
        }}
      >
        {genres.name} // Display the genre's name as the content of the Link
      </Link>
      <Button // Render a Button component for the "Edit" action
        title="Edit" // Set the title of the button to "Edit"
        onPress={() => router.push(`/genres/${genres._id}/edit`)} // Handle the onPress event to navigate to the edit screen for the genre
      />
      <DeleteBtn // Render the DeleteBtn component for deleting the genre
        resource="genres" // Pass the resource name as "genres"
        id={genres._id} // Pass the genre's _id as the id for deletion
        deleteCallback={onDelete} // Pass the onDelete function as the deleteCallback prop
      />
      <Text>_____________</Text> // Display a horizontal line using the Text component
    </View>
  );
}
