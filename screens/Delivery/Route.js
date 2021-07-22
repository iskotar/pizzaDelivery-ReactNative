import React from 'react'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAP_API_KEY } from '../../constants'

const Route = ({ orderList, setRoutePoints, destinationAddress }) => {

  if (!destinationAddress) return null

  return (
    <MapViewDirections
      origin={orderList[0].address}
      destination={destinationAddress}
      apikey={GOOGLE_MAP_API_KEY}
      strokeWidth={5}
      strokeColor='hotpink'
      waypoints={orderList.map(({ address }) => address)}
      optimizeWaypoints
      onReady={(data) => setRoutePoints(data.coordinates)}
    />
  )
}

export default Route
