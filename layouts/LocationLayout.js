import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { getNearbyPlacesBySearchRequest } from '../redux/actions/orderListActions'

const LocationLayout = ({children, getNearbyRestaurants, restaurants}) => {

  useEffect(() => {

    setTimeout(() => {
      getNearbyRestaurants()
    }, 5000)
  },[])

  const SplashScreen = () => {

    return (
      <View style={{
        backgroundColor: '#adcd34',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

      }}>
        <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold', transform: [{ rotate: "45deg" }]}}>Zae</Text>
        <Text style={{ color: 'white', fontSize: 80, fontWeight: 'bold'}}>PiZZA</Text>
      </View>
    )
  }

  if(!restaurants) return <SplashScreen/>

  return children
}

const mapStateToProps = (state) => ({
  restaurants: state.locations.restaurants,
})

const mapDispatchToProps = (dispatch) => ({
  getNearbyRestaurants: () => dispatch(getNearbyPlacesBySearchRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationLayout)
