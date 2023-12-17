import { Text } from 'react-native'; 
import { Slot, Redirect } from 'expo-router'; 
import Footer from '../../components/Footer';
import { useSession } from '../../contexts/AuthContext'; 

// Define the AuthLayout component
export default function AuthLayout() {
  const { session, isLoading } = useSession(); // Destructure session and isLoading from useSession hook

  // If the session is still loading, render "Loading..." text
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // If there is no active session, redirect to the homepage
  if (!session) {
    return <Redirect href='/' />; // Redirect to the homepage
  }
  
  // If the session is active, render the Slot and Footer components
  return (
    <>
      <Slot /> {/* Render the Slot component */}
      <Footer /> {/* Render the Footer component */}
    </>
  );
}