import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Styles from '../styles/Styles';
import MovieSearchHomescreen from './MovieSearchHomescreen';

export default function HomeScreen({ navigation }) {
  const [randomMovie, setRandomMovie] = useState('');

  useEffect(() => {
    getRandomMovie();
  }, []);

  const getRandomMovie = async () => {
    try {
      const storedMovieList = await AsyncStorage.getItem('movieList');
      if (storedMovieList !== null) {
        const movieList = JSON.parse(storedMovieList);
        const randomIndex = Math.floor(Math.random() * movieList.length);
        setRandomMovie(movieList[randomIndex]);
      }
    } catch (error) {
      console.error('Virhe haettaessa elokuvalistaa:', error);
    }
  };

  const handlePress = () => {
    getRandomMovie();
  };

  return (
    <ScrollView style={Styles.scrollview}>

      <Image source={require('../assets/splash.png')} 
      style={{
        width: '100%',
        height: 200,
        alignSelf: 'center',
        marginBottom: -10,
      }}/>

      <View style={Styles.homescreenBlock}>
        <Text style={Styles.valiotsikko}>Random movie generator</Text>
        <Text style={Styles.text}>
          Would this be good movie for tonight? If not, click the rotation to get new suggestion.
          </Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          alignItems: 'center',}}>
          <Text style={{
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 10,
            marginTop: 10,
            color: '#D3653E'
          }}>{randomMovie}</Text>
          <Pressable onPress={handlePress}>
            <FontAwesome name="rotate-right" size={20} color="#83C5BE" />
          </Pressable>
        </View>
      </View>

      <View style={Styles.homescreenBlock}>
        <Text style={Styles.valiotsikko}>Search movies</Text>
        <Text style={Styles.text}>
          Search movies from TMDB-database. Results are shown below.
        </Text>
        <MovieSearchHomescreen />
      </View>

      <View style={[Styles.homescreenBlock, Styles.lastSlide]}>
      <Text style={Styles.valiotsikko}>Information</Text>
        <Text style={Styles.text}>This is personal application, that was designed to keep track on collections. The designer, me, have collected physical movies, series and music for so long, that it's a real challenge to remember them all. So to prevent buying multiple copies, I created this app.</Text>
        <Text style={Styles.text}>The app is designed to be simple and easy to use. It's not meant to be a full scale movie database, but a tool to keep track on your own collection. The app is not meant to be used for commercial purposes.</Text>
        <Text style={Styles.text}>All the data in the app is stored locally on the device. The app is using TMDB-database to get information about movies. It doesn't collect any personal information from the user, use cookies or other tracking methods. The app is created with React Native and Expo. The source code is available in GitHub.</Text>
        <Text style={Styles.text}>&nbsp;&nbsp;- Saana Lapinkangas, 2023 (designer)</Text>
      </View>

    </ScrollView>
  );
}