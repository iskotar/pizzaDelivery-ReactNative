import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground
} from 'react-native'
import { connect } from 'react-redux'
import { GOOGLE_MAP_API_KEY } from '../../constants'
import { Entypo } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native';

const Pizzerias = ({ navigation, restaurants }) => {

  useFocusEffect(
    React.useCallback(() => {
      console.log('Pizzerias mounted')

      return () => {
        console.log('Pizzerias UNmounted')
      };
    }, [navigation])
  )

  const List = () => {

    return (
      <View style={styles.list}>
        {
          restaurants.map(({ photos, name, user_ratings_total, vicinity }, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.pizzaType}
              onPress={() => navigation.navigate('Order', { vicinity })}
            >
              <ImageBackground
                borderRadius={20}
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photos[0].photo_reference}&maxheight=500&maxwidth=500&key=${GOOGLE_MAP_API_KEY}`
                }}
                style={styles.image}
              >
                <View style={styles.info}>
                  <Text style={styles.text}>
                    {vicinity}
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name='star-outlined' size={30} color='white'/>
                    {user_ratings_total}
                  </Text>
                </View>

              </ImageBackground>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <List/>
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  restaurants: state.locations.restaurants,
})

export default connect(mapStateToProps)(Pizzerias)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#adcd34'
  },

  list: {
    marginBottom: 70
  },

  pizzaType: {
    marginHorizontal: 20,
    marginBottom: 40,
    height: 300,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },

  image: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  info: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 100,
    justifyContent: 'space-around'
  },

  text: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})
