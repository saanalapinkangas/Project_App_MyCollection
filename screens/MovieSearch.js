
import { TMDB_API_KEY } from '@env';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import Styles from '../styles/Styles';
import StylesMovieMap from '../styles/StylesMovieMap';
import StylesTabs from '../styles/StylesTabs';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        if (query.length > 2) {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`)
                .then(response => response.json())
                .then(data => setMovies(data.results))
                .catch(error => console.error(error));
        }
    }, [query]);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}`);
            const data = await response.json();
            setGenres(data.genres);
        };

        fetchGenres();
    }, []);

    const searchMovies = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`);
        const data = await response.json();
        setMovies(data.results);
    };

    const sortedMovies = movies.sort((a, b) => b.popularity - a.popularity);

    return (
        <View style={Styles.scrollview}>
            <View style={[StylesTabs.containerTMDBSearch]}>
                <TextInput
                    value={query}
                    onChangeText={text => setQuery(text)}
                    style={StylesTabs.input}
                    onSubmitEditing={searchMovies}
                    placeholder="Hae elokuvia..."
                />

                <Pressable
                    onPress={searchMovies}>
                    <Text><FontAwesome name="search" size={22} color="#E29578" /></Text>
                </Pressable>
            </View>
            
                {sortedMovies.map(movie => (
                    <View key={movie.id} style={StylesMovieMap.container}>
                        <Pressable onPress={() => navigation.navigate('MoviePage', { id: movie.id })}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                style={{ width: 100, height: 150, borderRadius: 10 }}
                            /></Pressable>
                        <View style={StylesMovieMap.container2}>
                            <Pressable onPress={() => navigation.navigate('MoviePage', { id: movie.id })}>
                                <Text style={StylesMovieMap.title}>{movie.title}</Text></Pressable>
                            <Text style={StylesMovieMap.year}>{new Date(movie.release_date).getFullYear()}</Text>
                            <Text style={StylesMovieMap.starText}>
                                <FontAwesome name="star" style={StylesMovieMap.starIcon} />
                                &nbsp; {parseFloat(movie.vote_average).toFixed(1)} / 10</Text>
                            <View style={StylesMovieMap.genres}>
                                {movie.genre_ids.map(genreId => {
                                    const genreName = genres.find(genre => genre.id === genreId)?.name;
                                    return (
                                        <View style={StylesMovieMap.genre} key={genreId}>
                                            <Text style={StylesMovieMap.genreText}>{genreName}</Text>
                                        </View>
                                    );
                                })}
                            </View>

                        </View>
                    </View>
                ))}
            
        </View>
    );
};

export default MovieSearch;