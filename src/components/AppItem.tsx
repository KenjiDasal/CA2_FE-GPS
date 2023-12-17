import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import DeleteBtn from './DeleteBtn';

interface MyProps {
    apps: {
        _id: string;
        title: string;
        type: string;
    };
    onDelete? : (id?: string) => void; // Optional onDelete function that takes an id as a parameter and returns void
}
export default function AppItem({ apps, onDelete }: MyProps) {
    const router = useRouter(); // Get the router object from the useRouter hook

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Link href={{ // Use Link component to navigate to a dynamic route
                    pathname: '/apps/[id]', // Set the pathname for the dynamic route
                    params: { id: apps._id } // Pass the id as a parameter for the dynamic route
                }}>
                <Text style={styles.titleText}>{apps.title}</Text>
                </Link>
                <Text style={styles.titleText}>{apps.type}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => router.push(`/apps/${apps._id}/edit`)} />
                <DeleteBtn resource="apps"  id={apps._id} deleteCallback={onDelete} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({ // Define styles using the StyleSheet.create method
    container: {
        justifyContent: 'space-between', // Align items with space between them
        alignItems: 'center', // Center align items
        padding: 10, // Add padding of 10 units
        borderBottomWidth: 1, // Add a bottom border with a width of 1 unit
        borderBottomColor: '#ccc', // Set the bottom border color to light gray
    },
    titleContainer: {
        flex: 1, // Take up all available space
        marginHorizontal: 25 // Add horizontal margin of 25 units
    },
    buttonContainer: {
        flex: 1, // Take up all available space
        flexDirection: 'row', // Arrange items horizontally
        alignItems: 'center', // Center align items
        justifyContent: 'space-between', // Align items with space between them
        marginHorizontal: 25, // Add horizontal margin of 25 units
    },
    titleText: {
        fontSize: 16, // Set font size to 16
        fontWeight: 'bold', // Set font weight to bold
        marginHorizontal: 20 // Add horizontal margin of 20 units
    },
    cityText: {
        fontSize: 14, // Set font size to 14
        color: '#555', // Set text color to dark gray
        marginHorizontal: 20 // Add horizontal margin of 20 units
    },
});