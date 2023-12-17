import { StatusBar } from 'expo-status-bar'; // Import the StatusBar component from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'; // Import the StyleSheet, Text, and View components from 'react-native'

// Default functional component for the app
export default function App() {
  return (
    <View style={styles.container}> 
      <Text>Open up App.tsx to start working on your app!</Text> 
      <StatusBar style="auto" />
    </View>
  );
}

// Define styles using StyleSheet
const styles = StyleSheet.create({
  container: { // Styles for the container View
    flex: 1, // Take the entire available space
    backgroundColor: '#fff', // Set the background color to white
    alignItems: 'center', // Align items in the center horizontally
    justifyContent: 'center', // Align items in the center vertically
  },
});