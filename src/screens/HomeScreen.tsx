import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { fetchMovies } from '../services/api';
import MovieItem from '../components/MovieItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../navigation/navigationTypes';


const HomeScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const [movies, setMovies] = useState<any>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadMovies = async (searchText = '') => {
    try {
      setLoading(true);
      const data = await fetchMovies(searchText);
      setMovies(data);
      setError('');
    } catch (err) {
      setError('Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadMovies(query);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem movie={item} onPress={() => navigation.navigate('MovieDetailScreen', { 
              id: item.id,
              diirector:item.director
             })} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
