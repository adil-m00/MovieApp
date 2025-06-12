import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MovieItem = ({ movie, onPress }:any) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{movie.title}</Text>
    <Text>Year: {movie.year}</Text>
    <Text>Director: {movie.director}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MovieItem;
