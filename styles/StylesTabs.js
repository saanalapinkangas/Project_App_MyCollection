import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Search ja Add -nappien container
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 40,
        paddingTop: 20,
        //backgroundColor: '#e29578',
        //backgroundColor: '#ffddd2',
        backgroundColor: '#efefef',
    },
    container3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    containerTMDBSearch: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 10,
    },
    // Search ja Add New -nappien sisältöjen yleinen container
    containerSearchAdd: {
        backgroundColor: 'white',
        paddingTop: 30,
        paddingBottom: 30,
        borderBottomColor: '#e5e5e5',
        borderBottomWidth: 1,
    },
    // Search ja Add -nappien tyylit
    pickButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        padding: 10,
        width: '40%',
        marginHorizontal: 5,
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
    },
    pickButtonActive: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e1e1e1',
        borderBottomColor: 'white',
        width: '50%',
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
    },
    pickText: {
        color: '#8c8c8c',
        textAlign: 'center',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    pickTextActive: {
        color: '#83C5BE',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        paddingTop: 20,
        paddingBottom: 10,
        textAlign: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 15,
        borderColor: '#E29578',
        borderWidth: 1,
        marginRight: 20,
    },
})