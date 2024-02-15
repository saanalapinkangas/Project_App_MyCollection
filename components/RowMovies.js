import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import StylesRow from '../styles/StylesRow';

// Rivien muodostaminen ja poistomahdollisuus

const RowMovies = ({ movie, onPress, isSelected, onDelete }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <View style={StylesRow.rowContainer}>
            <Pressable
                style={StylesRow.movieContainer}
                onPress={() => onPress(movie)}
                onPressIn={() => setIsPressed(true)}
            >
                <Text style={[StylesRow.movieText, isSelected && StylesRow.selectedMovieText]}>{movie}</Text>
            </Pressable>
            {isSelected && isPressed && <DeleteButton onDelete={onDelete} movie={movie} />}
        </View>
    )
}

const DeleteButton = ({ onDelete, movie }) => {
    return (
        <Pressable style={StylesRow.deleteButton} onPress={() => onDelete(movie)}>
            <Text style={StylesRow.deleteButtonBg}>
                <FontAwesome name="trash" style={StylesRow.iconTrash} /></Text>
        </Pressable>
    )
}

export default RowMovies;
