import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    container2: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: '75%',
    },
    title: {
        fontSize: 15,
        color: '#006D77',
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    year: {
        color: '#6c757d',
        fontSize: 11,
        marginBottom: 20,
    },
    starText: {
        color: '#6c757d',
        fontSize: 14,
        marginBottom: 25,
    },
    starIcon: {
        fontSize: 16,
        color: "#ffba08",
        marginRight: 5,
    },
    genres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      genre: {
        borderWidth: 1,
        borderColor: '#6c757d',
        borderRadius: 10,
        marginRight: 5,
        paddingHorizontal: 8,
        paddingVertical: 5,
      },
      genreText: {
        fontSize: 9,
        color: '#6c757d',
      },
})