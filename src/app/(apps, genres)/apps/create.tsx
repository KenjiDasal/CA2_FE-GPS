import axios from 'axios';
import { useState } from 'react';
import { TextInput, StyleSheet, Button, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '../../../contexts/AuthContext';
import { AppType } from '../../../types';

export default function Page() {
  const { session, isLoading } = useSession();
  const [error, setError] = useState('');
  const router = useRouter();

  const [form, setForm] = useState<AppType>({
    title: "",
    type: "",
    price: "",
    start_date: "",
    end_date: ""
  });

  if (isLoading) return <Text>Loading...</Text>;

  const handleChange = (e: any) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = () => {
    console.log(form);

    axios
      .post(`https://ca-google-play-store-main-csysgj3ns-kenji-dasals-projects.vercel.app/api/apps`, form, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        router.push(`/artists/${response.data._id}`);
      })
      .catch((e) => {
        console.error(e);
        setError(e.response.data.message);
      });
  };

  return (
    <>
      <Text>Title</Text>
        <TextInput 
            style={styles.input}
            placeholder='Title'
            onChange={handleChange}
            value={form.title}
            id="title"
        />

        <Text>Type</Text>
        <TextInput 
            style={styles.input}
            placeholder='Type'
            onChange={handleChange}
            value={form.type}
            id="type"
        />

        <Text>Price</Text>
        <TextInput 
            style={styles.input}
            placeholder='Price'
            onChange={handleChange}
            value={form.price}
            id="price"
        />

        <Text>Start Date</Text>
        <TextInput 
            style={styles.input}
            placeholder='Start Date'
            onChange={handleChange}
            value={form.start_date}
            id="start_date"
        />

        <Text>End Date</Text>
        <TextInput 
            style={styles.input}
            placeholder='End Date'
            onChange={handleChange}
            value={form.end_date}
            id="end_date"
        />

      <Text>{error}</Text>

      <Button
        onPress={handleClick}
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
