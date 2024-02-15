import { Feather, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import MoviePage from './screens/MoviePage';
import MovieSearch from './screens/MovieSearch';
import MyMovies from './screens/MyMovies';
import Search from './screens/MyMusic';
import AddNew from './screens/TvSeries';
import Wishlist from './screens/Wishlist';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const Header = ({ title, showBackButton }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.header}>
            <Text style={{
                fontSize: 18,
                marginRight: 8,
                color: '#DBA39A',
                fontWeight: 600,
                textTransform: 'uppercase'
            }}>{title}</Text>
            <MaterialCommunityIcons
                name="movie-search-outline"
                style={styles.navButton}
                size={30}
                onPress={() => navigation.navigate('MovieSearch')}
            />
        </View>
    );
}

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#efefef', height: 110
                }
            }}>
            <HomeStack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={24} color="white" />
                    ),
                    headerTitle: (props) => <Header {...props} title="home" />,
                    headerShown: true
                }}
            />
            <HomeStack.Screen
                name="MoviePage"
                component={MoviePage}
                style={styles.stackHeader}
                options={{
                    headerTitle: () => <Header title="Movie Page" showBackButton={true} />,
                    headerBackTitleVisible: false,
                    headerBackImage: () => null,
                    headerShown: true,
                }}
            />
            <HomeStack.Screen
                name="MovieSearch"
                component={MovieSearch}
                style={styles.stackHeader}
                options={{
                    headerTitle: () => <Header title="Search movies" showBackButton={true} />,
                    headerBackTitleVisible: false,
                    headerBackImage: () => null,
                    headerShown: true,
                }}
            />
        </HomeStack.Navigator>
    );

}

export default function BottomNavigationOrig() {
    return (
        <>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#efefef', height: 110,
                        }, // headerin asetukset
                        tabBarStyle: {
                            backgroundColor: '#DBA39A',
                            height: 85,
                        },
                        tabBarActiveTintColor: '#006D77',   // aktiivinen tekstiväri
                        tabBarInactiveTintColor: '#fff',    // inaktiivinen tekstiväri
                    }}
                >
                    <Tab.Screen
                        name="Home&Stack"
                        component={HomeStackScreen}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="home" size={24} color="white" />
                            ),
                            headerShown: false,
                            headerTitle: (props) => <Header {...props} title="My Collections" />,
                        }}
                    />
                    <Tab.Screen
                        name="Movies"
                        component={MyMovies}
                        options={{
                            tabBarLabel: 'Movies',
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="movie-open-outline" size={24} color="white" />
                            ),
                            headerTitle: (props) => <Header {...props} title="Movies" />,
                        }}
                    />
                    <Tab.Screen
                        name="TvSeries"
                        component={AddNew}
                        options={{
                            tabBarLabel: 'Tv-series',
                            tabBarIcon: ({ color, size }) => (
                                <Feather name="tv" size={24} color="white" />
                            ),
                            headerTitle: (props) => <Header {...props} title="Tv-Series" />,
                        }}
                    />
                    <Tab.Screen
                        name="Music"
                        component={Search}
                        options={{
                            tabBarLabel: 'Music',
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome name="music" size={24} color="white" />
                            ),
                            headerTitle: (props) => <Header {...props} title="Music"/>,
                        }}
                    />
                    <Tab.Screen
                        name="Wishlist"
                        component={Wishlist}
                        options={{
                            tabBarLabel: 'Wishlist',
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign name="hearto" size={24} color="white" />
                            ),
                            headerTitle: (props) => <Header {...props} title="Wishlist" />,
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stackHeader: {
        backgroundColor: '#fff',
    },
    navButton: {
        marginRight: 5,
        padding: 4,
        color: '#83C5BE',
    }
});

export { Header };

/* Poistettu takaisin-nappi Headerista (<view> jälkeen)
            {showBackButton && (
                    <AntDesign
                        name="arrowleft"
                        style={styles.navButton}
                        size={24}
                        color="#E29578"
                        onPress={() => navigation.goBack()}/>)}
                    */
