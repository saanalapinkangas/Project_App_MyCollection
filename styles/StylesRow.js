import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
    },
    movieContainer: {
        flex: 1,
    },
    movieText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingLeft: 40,
        fontSize: 14,
        fontWeight: 300,
        color: '#5c5c5c',
    },
    selectedMovieText: {
        fontWeight: '600',
        //color: '#006D77',
        backgroundColor: '#efefef',
    },
    deleteButton: {
        paddingRight: 30,
        backgroundColor: '#efefef',
        paddingTop: 8,
    },
    deleteButtonBg: {
        flex: 1,
        backgroundColor: '#efefef',
    },
    iconTrash: {
        fontSize: 20,
        color: '#FF5733',
    },
})