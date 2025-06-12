import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { fetchMovieDetails } from '../services/api';
import { RootStackParamList } from '../interfaces/MoviesInterface';
import { RouteProp } from '@react-navigation/native';

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

type Props = {
  route: MovieDetailRouteProp;
};
const MovieDetailScreen= ({ route }) => {
  const { id ,diirector} = route.params;
  const [movie, setMovie] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails(id)
      .then(setMovie)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />; 
  return (
    <ScrollView style={styles.container}>
      {movie ? (
        <>
          <Text style={styles.title}>{movie.title}</Text>
          <Text>Year: {movie.release_date}</Text>
          <Text>Director: {diirector}</Text>
          <Text>Genre: {movie.genres[0].name}</Text>
          <Text>Overview: {movie.overview}</Text>
          <Text style={styles.plot}>RunTime: {movie.runtime}</Text>
        </>
      ) : (
        <Text>Movie details not found.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15,marginTop:100 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  plot: { marginTop: 10 },
});

export default MovieDetailScreen;
