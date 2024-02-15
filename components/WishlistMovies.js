import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import RowMovies from '../components/RowMovies';
import StylesList from '../styles/StylesList';
import StylesWishlist from '../styles/StylesWishlist';

export default function WishlistMovies() {
    const [wishlistMovieName, setWishlistMovieName] = useState('');
    const [movieWishlist, setMovieWishlist] = useState([]);
    const [selectedMovieWishlist, setSelectedMovieWishlist] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        retrieveMovieWishlist();
    }, []);

    // Haetaan tallennettu lista
    const retrieveMovieWishlist = async () => {
        try {
            const storedMovieWishlist = await AsyncStorage.getItem('movieWishlist');
            if (storedMovieWishlist !== null) {
                setMovieWishlist(JSON.parse(storedMovieWishlist));
            }
        } catch (error) {
            console.error('Virhe haettaessa elokuvalistaa:', error);
        }
    };

    // Tallennetaan kohde
    const saveMovieWish = async () => {
        if (!wishlistMovieName.trim()) {
            setErrorMessage('Textfield cannot be empty')
            return
        }

        if (movieWishlist.includes(wishlistMovieName)) {
            setErrorMessage('This is already on the list')
            return
        }

        try {
            const updatedMovieWishlist = [...movieWishlist, wishlistMovieName];
            await AsyncStorage.setItem('movieWishlist', JSON.stringify(updatedMovieWishlist));
            setMovieWishlist(updatedMovieWishlist)
            setWishlistMovieName('') // Tyhjennetään kenttä tallennuksen jälkeen
            setErrorMessage('')
            console.log('Tallennettu:', wishlistMovieName)
        } catch (error) {
            console.error('Virhe tallentaessa:', error)
        }
    };

    // Poistetaan kohde
    const deleteMovieFromWishlist = async (wishlistMovieToDelete) => {
        Alert.alert(
            'Are you sure?',
            `Do you want to delete '${wishlistMovieToDelete}'?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Peruutettu'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const updatedMovieWishlist = movieWishlist.filter(movie => movie !== wishlistMovieToDelete);
                            await AsyncStorage.setItem('movieWishlist', JSON.stringify(updatedMovieWishlist));
                            setMovieWishlist(updatedMovieWishlist);
                            console.log('Poistettu:', wishlistMovieToDelete);
                        } catch (error) {
                            console.error('Virhe poistettaessa:', error);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    }

    // Tuloslistan muokkaus
    const renderItem = ({ item }) => (
        <RowMovies
            movie={item}
            onPress={highlightMovie}
            onDelete={deleteMovieFromWishlist}
            isSelected={item === selectedMovieWishlist} />)

    const highlightMovie = (movie) => { setSelectedMovieWishlist(movie) }

    return (
        <View>
            <View style={StylesWishlist.container3}>
                <TextInput
                    value={wishlistMovieName}
                    onChangeText={setWishlistMovieName}
                    placeholder="Add new movie to wishlist"
                    onSubmitEditing={saveMovieWish}
                    style={StylesWishlist.input}
                />
                <Pressable
                    onPress={saveMovieWish}>
                    <AntDesign name="pluscircle" style={StylesWishlist.pressable_add} /></Pressable>

                {errorMessage && (
                    <Text style={StylesWishlist.error}>{errorMessage}</Text>
                )}</View>


            <View style={StylesList.container2}>
                <Text style={StylesList.h2}>Movies on wishlist:</Text>
                <Text style={StylesList.subtitle}>Total {movieWishlist.length} pcs</Text>
            </View>
            <FlatList
                data={movieWishlist.sort()} //aakkosjärjestys
                renderItem={renderItem}
                style={StylesList.flatlist}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

