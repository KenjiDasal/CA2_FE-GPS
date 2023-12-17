import { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { Text, FlatList, Button } from 'react-native'; 
import { Link, useRouter } from 'expo-router'; 
import GenreItem from '../../../components/GenreItem';

// Define the GenrePage component
export default function GenrePage() {
  const [genres, setGenres] = useState([]); // Initialize state variable 'genres' as an empty array

  // Fetch genres data on component mount
  useEffect(() => {
    axios
      .get('https://ca-google-play-store-main-csysgj3ns-kenji-dasals-projects.vercel.app/api/genres')
      .then((response) => {
        console.log(response.data); // Log the retrieved data
        setGenres(response.data); // Update the 'genres' state with the retrieved data
      })
      .catch((e) => {
        console.error(e); // Log any errors
      });
  }, []); // The empty dependency array ensures the effect runs only once on component mount

  // Define a function to handle genre deletion
  const onDelete = (id?: string) => {
    let newGenres = genres.filter((genre: any) => genre._id !== id); // Filter out the genre with the specified ID
    setGenres(newGenres); // Update the 'genres' state with the filtered genres
  };

  // Create a list of GenreItem components based on the 'genres' state
  let genreList = genres.map((genre: any) => {
    return <GenreItem key={genre._id} genres={genre} onDelete={onDelete} />; // Render a GenreItem component for each genre
  });

  return <>{genreList}</>; // Render the list of GenreItem components
}