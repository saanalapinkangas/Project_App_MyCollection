import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import WishlistMovies from '../components/WishlistMovies';
import WishlistMusic from '../components/WishlistMusic';
import WishlistTvSeries from '../components/WishlistTvSeries';
import StylesWishlist from '../styles/StylesWishlist';

export default function Wishlist() {
  const [showMovieWishlist, setShowMovieWishlist] = useState(false)
  const [showSeriesWishlist, setShowSeriesWishlist] = useState(false)
  const [showMusicWishlist, setShowMusicWishlist] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <>
    <View style={StylesWishlist.container1}>
    <Pressable
          style={[StylesWishlist.pickButton, showMovieWishlist && StylesWishlist.pickButtonActive]}
          onPress={() => {
            setShowMovieWishlist(!showMovieWishlist)
            if ([showSeriesWishlist, showMusicWishlist]) [setShowSeriesWishlist(false), setShowMusicWishlist(false)]
            setErrorMessage('')
          }}>
          <Text style={[StylesWishlist.pickText, showMovieWishlist && StylesWishlist.pickTextActive]}>Movies</Text>
        </Pressable>

        <Pressable
          style={[StylesWishlist.pickButton, showSeriesWishlist && StylesWishlist.pickButtonActive]}
          onPress={() => {
            setShowSeriesWishlist(!showSeriesWishlist)
            if ([showMovieWishlist, showMusicWishlist]) [setShowMovieWishlist(false), setShowMusicWishlist(false)]
            setErrorMessage('')
          }}>
          <Text style={[StylesWishlist.pickText, showSeriesWishlist && StylesWishlist.pickTextActive]}>Tv-Series</Text>
        </Pressable>

        <Pressable
          style={[StylesWishlist.pickButton, showMusicWishlist && StylesWishlist.pickButtonActive]}
          onPress={() => {
            setShowMusicWishlist(!showMusicWishlist)
            if ([showSeriesWishlist, showMovieWishlist]) [setShowSeriesWishlist(false), setShowMovieWishlist(false)]
            setErrorMessage('')
          }}>
          <Text style={[StylesWishlist.pickText, showMusicWishlist && StylesWishlist.pickTextActive]}>Music</Text>
        </Pressable>

      </View>

      {showMovieWishlist && (
    <WishlistMovies />
      )}

{showSeriesWishlist && (
    <WishlistTvSeries />
      )}

{showMusicWishlist && (
    <WishlistMusic />
      )}

<View style={StylesWishlist.container3}>
      {!showMovieWishlist && !showSeriesWishlist && !showMusicWishlist && (
        <Text style={StylesWishlist.note}>Choose a category</Text>
      )}
      </View>
    </>
  );
};