import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import RowMovies from '../components/RowMovies';
import Search from '../components/Search';
import StylesList from '../styles/StylesList';
import StylesTabs from '../styles/StylesTabs';

export default function MyMovies() {
  const [movieName, setMovieName] = useState('')
  const [movieList, setMovieList] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)

  useEffect(() => {
    retrieveMovieList();
  }, []);

    // Haetaan tallennettu lista
  const retrieveMovieList = async () => {
    try {
      const storedMovieList = await AsyncStorage.getItem('movieList');
      if (storedMovieList !== null) {
        setMovieList(JSON.parse(storedMovieList));
      }
    } catch (error) {
      console.error('Virhe haettaessa elokuvalistaa:', error);
    }
  };

  // Tallennetaan kohde
  const saveMovie = async () => {
    if (!movieName.trim()) {
      setErrorMessage('Textfield cannot be empty')
      return
    }

    if (movieList.includes(movieName)) {
      setErrorMessage('This is already on the list')
      return
    }

    try {
      const updatedMovieList = [...movieList, movieName];
      await AsyncStorage.setItem('movieList', JSON.stringify(updatedMovieList));
      setMovieList(updatedMovieList)
      setMovieName('') // Tyhjennetään kenttä tallennuksen jälkeen
      setErrorMessage('')
      console.log('Tallennettu:', movieName)
    } catch (error) {
      console.error('Virhe tallentaessa:', error)
    }
  };

  // Poistetaan kohde
  const deleteMovie = async (movieToDelete) => {
    Alert.alert(
      'Are you sure?',
      `Do you want to delete '${movieToDelete}'?`,
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
      const updatedMovieList = movieList.filter(movie => movie !== movieToDelete);
      await AsyncStorage.setItem('movieList', JSON.stringify(updatedMovieList));
      setMovieList(updatedMovieList);
      console.log('Poistettu:', movieToDelete);
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
    onDelete={deleteMovie}
    isSelected={item === selectedMovie} /> )
  const highlightMovie = (movie) => { setSelectedMovie(movie) }

  // Hakutoiminto
  const executeSearch = (search) => {
    if (search === "") {
      // Jos hakukenttä on tyhjä, palautetaan alkuperäinen elokuvien lista
      retrieveMovieList()
    } else {
    const searchArray = movieList.filter((item) => item.startsWith(search))
    setMovieList(searchArray)
  }}

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
              value={movieName}
              onChangeText={setMovieName}
              placeholder="Add new movie to collection"
              onSubmitEditing={saveMovie}
              style={StylesTabs.input}
            />
            <Pressable
              onPress={saveMovie}>
              <AntDesign name="pluscircle" style={StylesList.pressable_add} /></Pressable>

            {errorMessage && (
              <Text style={StylesTabs.error}>{errorMessage}</Text>
            )}</View>
        </>
      )}

<View style={StylesList.container2}>
        <Text style={StylesList.h2}>Collected movies:</Text>
        <Text style={StylesList.subtitle}>Total {movieList.length} pcs</Text>
      </View>
      <FlatList
        data={movieList.sort()} //aakkosjärjestys
        renderItem={renderItem}
        style={StylesList.flatlist}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};