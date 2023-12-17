import { Text, Button, StyleSheet, View } from 'react-native'; // Import necessary components from 'react-native'
import { Link } from 'expo-router';// Import necessary components from 'react-native'

import LoginForm from '../components/LoginForm';// Import Link from 'expo-router'

import { useSession } from '../contexts/AuthContext';// Import the useSession hook from AuthContext

export default function Page() {
  const { session, signOut } = useSession();// Destructure session and signOut from useSession hook

  return (
    <>
    <View style={styles.container}> 
    <View style={styles.secondContainer}>
        <>
          <Text style={styles.textDownload}>   
            Please login to download an App.
          </Text>

          {(!session) ? ( // Use conditional rendering to check if the user is logged in
          <LoginForm /> // Render the LoginForm component if the user is not logged in
            ) : (
            <>
              <Text style={styles.textLogin}>You are logged in</Text>
              <Link href={'/apps'} asChild>
                <Button style={styles.allApps} title='All apps' />
              </Link>
              <Button style={styles.logout} color="#a60808" onPress={signOut} title='Logout' />
            </>
          )}
        </>
      </View>
      </View>
    </>
  );
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
      },
      secondContainer: {
        marginHorizontal: 30
      },
      buttonContainer: {
        textAlign: 'center', 
        paddingBottom: 25
      },
      textDownload: {
        paddingVertical: 50, 
        background: 'red'
      },
      textLogin: {
        textAlign: 'center', 
        paddingBottom: 25
      },
      allApps: {
        fontSize: 14,
        color: '#555',
        marginHorizontal: 20
      },
      logout: {
          fontSize: 14,
          color: '#555',
          marginHorizontal: 20,
          backgroundColor: '#a60808'
      },
  });
