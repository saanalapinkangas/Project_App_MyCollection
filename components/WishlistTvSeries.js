import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import RowMovies from '../components/RowMovies';
import StylesList from '../styles/StylesList';
import StylesWishlist from '../styles/StylesWishlist';

export default function WishlistTvSeries() {
    const [wishlistSeriesName, setwishlistSeriesName] = useState('');
    const [seriesWishlist, setseriesWishlist] = useState([]);
    const [selectedseriesWishlist, setSelectedseriesWishlist] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        retrieveseriesWishlist();
    }, []);

    // Haetaan tallennettu lista
    const retrieveseriesWishlist = async () => {
        try {
            const storedseriesWishlist = await AsyncStorage.getItem('seriesWishlist');
            if (storedseriesWishlist !== null) {
                setseriesWishlist(JSON.parse(storedseriesWishlist));
            }
        } catch (error) {
            console.error('Virhe haettaessa elokuvalistaa:', error);
        }
    };

    // Tallennetaan kohde
    const saveSeriesWish = async () => {
        if (!wishlistSeriesName.trim()) {
            setErrorMessage('Textfield cannot be empty')
            return
        }

        if (seriesWishlist.includes(wishlistSeriesName)) {
            setErrorMessage('This is already on the list')
            return
        }

        try {
            const updatedseriesWishlist = [...seriesWishlist, wishlistSeriesName];
            await AsyncStorage.setItem('seriesWishlist', JSON.stringify(updatedseriesWishlist));
            setseriesWishlist(updatedseriesWishlist)
            setwishlistSeriesName('') // Tyhjennetään kenttä tallennuksen jälkeen
            setErrorMessage('')
            console.log('Tallennettu:', wishlistSeriesName)
        } catch (error) {
            console.error('Virhe tallentaessa:', error)
        }
    };

    // Poistetaan kohde
    const deleteSeriesFromWishlist = async (wishlistSerieToDelete) => {
        Alert.alert(
            'Are you sure?',
            `Do you want to delete '${wishlistSerieToDelete}'?`,
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
                            const updatedseriesWishlist = seriesWishlist.filter(movie => movie !== wishlistSerieToDelete);
                            await AsyncStorage.setItem('seriesWishlist', JSON.stringify(updatedseriesWishlist));
                            setseriesWishlist(updatedseriesWishlist);
                            console.log('Poistettu:', wishlistSerieToDelete);
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
            onPress={highlightSerie}
            onDelete={deleteSeriesFromWishlist}
            isSelected={item === selectedseriesWishlist} />)

    const highlightSerie = (movie) => { setSelectedseriesWishlist(movie) }

    return (
        <View>
            <View style={StylesWishlist.container3}>
                <TextInput
                    value={wishlistSeriesName}
                    onChangeText={setwishlistSeriesName}
                    placeholder="Add new serie to wishlist"
                    onSubmitEditing={saveSeriesWish}
                    style={StylesWishlist.input}
                />
                <Pressable
                    onPress={saveSeriesWish}>
                    <AntDesign name="pluscircle" style={StylesWishlist.pressable_add} /></Pressable>

                {errorMessage && (
                    <Text style={StylesWishlist.error}>{errorMessage}</Text>
                )}</View>


            <View style={StylesList.container2}>
                <Text style={StylesList.h2}>series on wishlist:</Text>
                <Text style={StylesList.subtitle}>Total {seriesWishlist.length} pcs</Text>
            </View>
            <FlatList
                data={seriesWishlist.sort()} //aakkosjärjestys
                renderItem={renderItem}
                style={StylesList.flatlist}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

