import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import StylesRow from '../styles/StylesRow';

// Rivien muodostaminen ja poistomahdollisuus

const RowMusic = ({ music, onPress, isSelected, onDelete }) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <View style={StylesRow.rowContainer}>
            <Pressable
                style={StylesRow.movieContainer}
                onPress={() => onPress(music)}
                onPressIn={() => setIsPressed(true)}
            >
                <Text style={[StylesRow.movieText, isSelected && StylesRow.selectedMovieText]}>{music}</Text>
            </Pressable>
            {isSelected && isPressed && <DeleteButton onDelete={onDelete} music={music} />}
        </View>
    )
}

const DeleteButton = ({ onDelete, music }) => {
    return (
        <Pressable style={StylesRow.deleteButton} onPress={() => onDelete(music)}>
            <Text style={StylesRow.deleteButtonBg}><FontAwesome name="trash" style={StylesRow.iconTrash} /></Text>
        </Pressable>
    )
}

export default RowMusic;
