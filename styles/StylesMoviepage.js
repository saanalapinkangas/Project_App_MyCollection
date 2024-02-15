import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingVertical: 30,
        marginHorizontal: 30,
        backgroundColor: '#f8f9fa',
    },
    container1: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    container2: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20,
        width: '75%',
    },
    image: {
        width: 120,
        height: 180,
        borderRadius: 10,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    title: {
        fontSize: 17,
        color: '#006D77',
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 3,
    },
    subtitle: {
        fontSize: 12,
        color: '#6c757d',
    },
    year: {
        color: '#212529',
        fontSize: 13,
        marginTop: 15,
        marginBottom: 20,
    },
    starText: {
        color: '#E29578',
        fontSize: 14,
        marginBottom: 25,
        fontWeight: '500',
    },
    starIcon: {
        fontSize: 17,
        color: "#ffba08",
        marginRight: 5,
    },
    tagline: {
        fontStyle: 'italic',
        color: '#006D77',
        fontSize: 14,
        marginBottom: 30,
        marginTop: 30,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    overview: {
        color: '#212529',
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    genres: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    genre: {
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 10,
        marginRight: 5,
        marginBottom: 2,
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    genreText: {
        fontSize: 9,
        color: '#6c757d',
    },
    text: {
        color: '#8c8c8c',
        fontSize: 14,
        //paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
    },
    hr: {
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 1,
        marginTop: 15,
    },
    button: {
        //backgroundColor: '#83C5BE',
        paddingVertical: 10,
        borderColor: '#83C5BE',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 40,
        marginBottom: 20,
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    moreInfo: {
        color: '#83C5BE',
        textAlign: 'center',
        fontSize: 16,
    },

})