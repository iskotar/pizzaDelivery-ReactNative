import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getNearbyPlacesBySearchRequest } from '../redux/actions/orderListActions'
import SplashScreen from '../components/SplashScreen'

const LocationLayout = ({children, getNearbyRestaurants, restaurants}) => {

  useEffect(() => {

    setTimeout(() => {
      getNearbyRestaurants()
    }, 2000)
  },[])

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
