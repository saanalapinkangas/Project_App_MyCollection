import { TMDB_API_KEY } from '@env';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, Linking, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import StylesMoviepage from '../styles/StylesMoviepage';

export default function MoviePage({ route }) {
    const movieId = route.params.id;
    const [movie, setMovie] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Lisää tämä rivi
                setMovie(data);
            })
            .catch(error => console.error(error));
    }, [movieId]);

    if (!movie) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={{ backgroundColor: '#f8f9fa', flex: 1 }}>
            <View style={StylesMoviepage.container}>

                <View style={StylesMoviepage.container1}>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                            style={StylesMoviepage.image}
                        /></TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <TouchableOpacity style={StylesMoviepage.modal} onPress={() => setModalVisible(false)}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                                style={{ width: '90%', height: '90%' }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </Modal>

                    <View style={StylesMoviepage.container2}>
                        <Text style={StylesMoviepage.title}>{movie.title}</Text>
                        <Text style={StylesMoviepage.subtitle}>orig. {movie.original_title}</Text>
                        <Text style={StylesMoviepage.year}>{new Date(movie.release_date).getFullYear()}
                            &nbsp; |&nbsp; {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`}</Text>

                        <View style={StylesMoviepage.genres}>
                            {movie.genres.map((genre) => (
                                <View key={genre.id} style={StylesMoviepage.genre}>
                                    <Text key={genre.id} style={StylesMoviepage.genreText}>{genre.name}</Text>
                                </View>
                            ))}</View>

                        <Text style={StylesMoviepage.starText}>
                            <FontAwesome name="star" style={StylesMoviepage.starIcon} />
                            &nbsp; {parseFloat(movie.vote_average).toFixed(1)} / 10</Text>

                    </View>
                </View>
                <View style={StylesMoviepage.hr}/>
                <Text style={StylesMoviepage.tagline}>{movie.tagline}</Text>
                <Text style={StylesMoviepage.overview}>{movie.overview}</Text>
                <View style={StylesMoviepage.hr}/>
                
                <Pressable
                    style={StylesMoviepage.button}
                    onPress={() => Linking.openURL(`https://www.imdb.com/title/${movie.imdb_id}`)}>
        <Text style={StylesMoviepage.moreInfo}>View movie on IMDb &nbsp;&nbsp;&nbsp;<AntDesign name="arrowright" size={20} color="#83C5BE" /></Text>
      </Pressable>
            </View>
        </View>

    );
}