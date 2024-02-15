import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Search({ executeSearch }) {
    const [search, setSearch] = useState("");

    return (
        <View style={styles.bg}>
            <Text><FontAwesome name="search" style={styles.icon} /></Text>
            <TextInput
                style={styles.searchBox}
                value={search}
                onChangeText={(text) => {
                    setSearch(text)
                    executeSearch(text)
                    // Kutsutaan executeSearch-funktiota aina, kun tekstiä muutetaan
                }}
                placeholder="Search..."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBox: {
        borderColor: '#E29578',
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        width: '90%',
        marginLeft: 10,
    },
    bg: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        marginHorizontal: 20,
    },
    icon: {
        fontSize: 20,
        color: '#E29578',
    },
});