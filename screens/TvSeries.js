import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import RowMovies from '../components/RowMovies';
import Search from '../components/Search';
import StylesList from '../styles/StylesList';
import StylesTabs from '../styles/StylesTabs';

export default function MyTvSeries() {
    const [seriesName, setseriesName] = useState('')
    const [seriesList, setseriesList] = useState([])
    const [selectedSeries, setselectedSeries] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [showTextInput, setShowTextInput] = useState(false)

    useEffect(() => {
        retrieveseriesList();
    }, []);

    // Haetaan tallennettu lista
    const retrieveseriesList = async () => {
        try {
            const storedseriesList = await AsyncStorage.getItem('seriesList');
            if (storedseriesList !== null) {
                setseriesList(JSON.parse(storedseriesList));
            }
        } catch (error) {
            console.error('Virhe haettaessa elokuvalistaa:', error);
        }
    };

    // Tallennetaan kohde
    const saveSeries = async () => {
        if (!seriesName.trim()) {
            setErrorMessage('Textfield cannot be empty')
            return
        }

        if (seriesList.includes(seriesName)) {
            setErrorMessage('This is already on the list')
            return
        }

        try {
            const updatedseriesList = [...seriesList, seriesName];
            await AsyncStorage.setItem('seriesList', JSON.stringify(updatedseriesList));
            setseriesList(updatedseriesList)
            setseriesName('') // Tyhjennetään kenttä tallennuksen jälkeen
            setErrorMessage('')
            console.log('Tallennettu:', seriesName)
        } catch (error) {
            console.error('Virhe tallentaessa:', error)
        }
    };

    // Poistetaan kohde
    const deleteSeries = async (serieToDelete) => {
        Alert.alert(
            'Are you sure?',
            `Do you want to delete '${serieToDelete}'?`,
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
                            const updatedseriesList = seriesList.filter(movie => movie !== serieToDelete);
                            await AsyncStorage.setItem('seriesList', JSON.stringify(updatedseriesList));
                            setseriesList(updatedseriesList);
                            console.log('Poistettu:', serieToDelete);
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
            onPress={highlightSeries}
            onDelete={deleteSeries}
            isSelected={item === selectedSeries} />)
    const highlightSeries = (movie) => { setselectedSeries(movie) }

    // Hakutoiminto
    const executeSearch = (search) => {
        if (search === "") {
            // Jos hakukenttä on tyhjä, palautetaan alkuperäinen elokuvien lista
            retrieveseriesList()
        } else {
            const searchArray = seriesList.filter((item) => item.startsWith(search))
            setseriesList(searchArray)
        }
    }

    return (
        <>
            <View style={StylesTabs.container1}>
                <Pressable
                    style={[StylesTabs.pickButton, showSearch && StylesTabs.pickButtonActive]}
                    onPress={() => {
                        setShowSearch(!showSearch)
                        if (showTextInput) setShowTextInput(false)
                        setErrorMessage('')
                    }}>
                    <Text style={[StylesTabs.pickText, showSearch && StylesTabs.pickTextActive]}>Search</Text>
                </Pressable>

                <Pressable
                    style={[StylesTabs.pickButton, showTextInput && StylesTabs.pickButtonActive]}
                    onPress={() => {
                        setShowTextInput(!showTextInput)
                        if (showSearch) setShowSearch(false)
                        setErrorMessage('')
                    }}>
                    <Text style={[StylesTabs.pickText, showTextInput && StylesTabs.pickTextActive]}>Add new</Text>
                </Pressable>
            </View>

            {showSearch && (
                <View style={StylesTabs.containerSearchAdd}>
                    <Search executeSearch={executeSearch} />
                </View>)}

            {showTextInput && (
                <>
                    <View style={[StylesTabs.container3, StylesTabs.containerSearchAdd]}>
                        <TextInput
                            value={seriesName}
                            onChangeText={setseriesName}
                            placeholder="Add new series to collection"
                            onSubmitEditing={saveSeries}
                            style={StylesTabs.input}
                        />
                        <Pressable
                            onPress={saveSeries}>
                            <AntDesign name="pluscircle" style={StylesList.pressable_add} /></Pressable>

                        {errorMessage && (
                            <Text style={StylesTabs.error}>{errorMessage}</Text>
                        )}</View>
                </>
            )}

            <View style={StylesList.container2}>
                <Text style={StylesList.h2}>Collected series:</Text>
                <Text style={StylesList.subtitle}>Total {seriesList.length} pcs</Text>
            </View>
            <FlatList
                data={seriesList.sort()} //aakkosjärjestys
                renderItem={renderItem}
                style={StylesList.flatlist}
                showsVerticalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
            />
        </>
    );
};