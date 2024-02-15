import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import RowMovies from '../components/RowMovies';
import StylesList from '../styles/StylesList';
import StylesWishlist from '../styles/StylesWishlist';

export default function WishlistTvmusics() {
    const [wishlistMusicName, setwishlistMusicName] = useState('');
    const [musicWishlist, setmusicWishlist] = useState([]);
    const [selectedmusicWishlist, setSelectedmusicWishlist] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        retrievemusicWishlist();
    }, []);

    // Haetaan tallennettu lista
    const retrievemusicWishlist = async () => {
        try {
            const storedmusicWishlist = await AsyncStorage.getItem('musicWishlist');
            if (storedmusicWishlist !== null) {
                setmusicWishlist(JSON.parse(storedmusicWishlist));
            }
        } catch (error) {
            console.error('Virhe haettaessa musiikkilistaa:', error);
        }
    };

    // Tallennetaan kohde
    const saveMusicWish = async () => {
        if (!wishlistMusicName.trim()) {
            setErrorMessage('Textfield cannot be empty')
            return
        }

        if (musicWishlist.includes(wishlistMusicName)) {
            setErrorMessage('This is already on the list')
            return
        }

        try {
            const updatedmusicWishlist = [...musicWishlist, wishlistMusicName];
            await AsyncStorage.setItem('musicWishlist', JSON.stringify(updatedmusicWishlist));
            setmusicWishlist(updatedmusicWishlist)
            setwishlistMusicName('') // Tyhjennetään kenttä tallennuksen jälkeen
            setErrorMessage('')
            console.log('Tallennettu:', wishlistMusicName)
        } catch (error) {
            console.error('Virhe tallentaessa:', error)
        }
    };

    // Poistetaan kohde
    const deleteMusicFromWishlist = async (wishlistMusicToDelete) => {
        Alert.alert(
            'Are you sure?',
            `Do you want to delete '${wishlistMusicToDelete}'?`,
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
                            const updatedmusicWishlist = musicWishlist.filter(movie => movie !== wishlistMusicToDelete);
                            await AsyncStorage.setItem('musicWishlist', JSON.stringify(updatedmusicWishlist));
                            setmusicWishlist(updatedmusicWishlist);
                            console.log('Poistettu:', wishlistMusicToDelete);
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
            onPress={highlightMusic}
            onDelete={deleteMusicFromWishlist}
            isSelected={item === selectedmusicWishlist} />)

    const highlightMusic = (movie) => { setSelectedmusicWishlist(movie) }

    return (
        <View>
            <View style={StylesWishlist.container3}>
                <TextInput
                    value={wishlistMusicName}
                    onChangeText={setwishlistMusicName}
                    placeholder="Add new music to wishlist"
                    onSubmitEditing={saveMusicWish}
                    style={StylesWishlist.input}
                />
                <Pressable
                    onPress={saveMusicWish}>
                    <AntDesign name="pluscircle" style={StylesWishlist.pressable_add} /></Pressable>

                {errorMessage && (
                    <Text style={StylesWishlist.error}>{errorMessage}</Text>
                )}</View>


            <View style={StylesList.container2}>
                <Text style={StylesList.h2}>music on wishlist:</Text>
                <Text style={StylesList.subtitle}>Total {musicWishlist.length} pcs</Text>
            </View>
            <FlatList
                data={musicWishlist.sort()} //aakkosjärjestys
                renderItem={renderItem}
                style={StylesList.flatlist}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

