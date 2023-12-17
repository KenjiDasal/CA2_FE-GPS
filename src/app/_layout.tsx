import { Drawer } from 'expo-router/drawer'; 
import { SessionProvider } from '../contexts/AuthContext'; 

// Define the Layout component
export default function Layout() {
  return (
    <SessionProvider> {/* Wrap the layout with <link>SessionProvider</link> to manage the user's session */}
      <Drawer> {/* Use the <link>Drawer</link> component to create a navigation drawer */}
        {/* Define individual screens within the <link>Drawer</link> */}
        <Drawer.Screen 
          name='index' // Screen name for the home screen
          options={{
            drawerLabel: "Home", // Label for the home screen in the drawer
            title: "Google Play Store", // Title for the home screen
            headerTitleStyle: {
              color: "#5f6368" // Custom header title style for the home screen
            }
          }}
        />
        <Drawer.Screen 
          name='apps' // Screen name for the apps screen
          options={{
            drawerLabel: "Apps", // Label for the apps screen in the drawer
            title: "Apps", // Title for the apps screen
            headerTitleStyle: {
              color: "#5f6368" // Custom header title style for the apps screen
            }
          }}
        />
        <Drawer.Screen 
          name='genres' // Screen name for the genres screen
          options={{
            drawerLabel: "Genres", // Label for the genres screen in the drawer
            title: "Genres", // Title for the genres screen
            headerTitleStyle: {
              color: "#5f6368" // Custom header title style for the genres screen
            }
          }}
        />
      </Drawer>
    </SessionProvider>
  );
}