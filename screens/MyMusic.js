import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import RowMusic from '../components/RowMusic';
import Search from '../components/Search';
import StylesList from '../styles/StylesList';
import StylesTabs from '../styles/StylesTabs';

export default function MyMusic() {
  const [musicName, setMusicName] = useState('')
  const [musicList, setMusicList] = useState([])
  const [selectedMusic, setSelectedMusic] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)

  useEffect(() => {
    retrieveMusicList();
  }, []);

  // Haetaan tallennettu lista
  const retrieveMusicList = async () => {
    try {
      const storedMusicList = await AsyncStorage.getItem('musicList');
      if (storedMusicList !== null) {
        setMusicList(JSON.parse(storedMusicList));
      }
    } catch (error) {
      console.error('Virhe haettaessa musiikkilistaa:', error);
    }
  };

  // Tallennetaan kohde
  const saveMusic = async () => {
    if (!musicName.trim()) {
      setErrorMessage('Textfield cannot be empty')
      return
    }

    if (musicList.includes(musicName)) {
      setErrorMessage('This is already on the list')
      return
    }

    try {
      const updatedMusicList = [...musicList, musicName];
      await AsyncStorage.setItem('musicList', JSON.stringify(updatedMusicList));
      setMusicList(updatedMusicList)
      setMusicName('') // Tyhjennetään kenttä tallennuksen jälkeen
      setErrorMessage('')
      console.log('Tallennettu:', musicName)
    } catch (error) {
      console.error('Virhe tallennettaessa:', error)
    }
  };

  // Poistetaan kohde
  const deleteMusic = async (musicToDelete) => {
    Alert.alert(
      'Are you sure?',
      `Do you want to delete '${musicToDelete}'?`,
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
              const updatedMusicList = musicList.filter(music => music !== musicToDelete);
              await AsyncStorage.setItem('musicList', JSON.stringify(updatedMusicList));
              setMusicList(updatedMusicList);
              console.log('Poistettu:', musicToDelete);
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
    <RowMusic
      music={item}
      onPress={highlightMusic}
      onDelete={deleteMusic}
      isSelected={item === selectedMusic} />)
  const highlightMusic = (music) => { setSelectedMusic(music) }

  // Hakutoiminto
  const executeSearch = (search) => {
    if (search === "") {
      // Jos hakukenttä on tyhjä, palautetaan alkuperäinen elokuvien lista
      retrieveMusicList()
    } else {
      const searchArray = musicList.filter((item) => item.startsWith(search))
      setMusicList(searchArray)
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
              value={musicName}
              onChangeText={setMusicName}
              placeholder="Add new music (Artist - album)"
              onSubmitEditing={saveMusic}
              style={StylesTabs.input}
            />
            <Pressable
              onPress={saveMusic}>
              <AntDesign name="pluscircle" style={StylesList.pressable_add} /></Pressable>

            {errorMessage && (
              <Text style={StylesTabs.error}>{errorMessage}</Text>
            )}</View>
        </>
      )}


      <View style={StylesList.container2}>
        <Text style={StylesList.h2}>Collected albums:</Text>
        <Text style={StylesList.subtitle}>Total {musicList.length} pcs</Text>
      </View>
      <FlatList
        data={musicList.sort()} //aakkosjärjestys
        renderItem={renderItem}
        style={StylesList.flatlist}
        showsVerticalScrollIndicator={true}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};