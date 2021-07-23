import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import Restaurants from './Restaurants'
import Route from './Route'
import IncomingCallDialog from './IncomingCallDialog'
import DeliveryCar from './DeliveryCar'
import DelivererInfo from './DelivererInfo'
import OutgoingCallDialog from './OutgoingCallDialog'
import FinishOrder from './FinishOrder'

const DeliveryNav = ({ locations, orderList, orderTotal, navigation }) => {
  const [showCallDialog, setShowCallDialog] = useState(false)
  const [showDialDialog, setShowDialDialog] = useState(false)
  const [showFinishOrder, setShowFinishOrder] = useState(false)
  const [routePoints, setRoutePoints] = useState([])

  const driver = {
    name: 'Dinesh',
    avatar: require('../../assets/dinesh.jpeg')
  }

  const destinationAddress = (() => {
    if(orderTotal.isPayed) return orderTotal.destination.address.trim() || locations.userLocation
  })()

  useFocusEffect(
    React.useCallback(() => {
      console.log('DeliveryNav mounted')

      return () => {
        console.log('DeliveryNav UNmounted')
      }
    }, [navigation])
  )

  useEffect(() => {
    if(!destinationAddress) setRoutePoints([])
  },[destinationAddress])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={locations.userLocation}
        showsUserLocation
      >
        <Restaurants
          isHidden={destinationAddress}
          locations={locations}
        />
        <Route
          orderList={orderList}
          destinationAddress={destinationAddress}
          setRoutePoints={setRoutePoints}
        />
        <DeliveryCar
          destinationAddress={destinationAddress}
          routePoints={routePoints}
          onShowCallDialog={() => setShowCallDialog(true)}
        />
      </MapView>

      <DelivererInfo
        isHidden={!destinationAddress}
        driver={driver}
        onShowDialDialog={() => setShowDialDialog(true)}
      />
      <IncomingCallDialog
        show={!showDialDialog && showCallDialog}
        onHideCallDialog={setShowCallDialog}
        driver={driver}
        onShowFinishOrder={() => setShowFinishOrder(true)}
        onShowCallDialog={setShowCallDialog}
      />
      <OutgoingCallDialog
        show={showDialDialog}
        onHide={() => setShowDialDialog(false)}
        driver={driver}
      />
      <FinishOrder
        show={showFinishOrder}
        onHide={() => setShowFinishOrder(false)}
      />
    </View>
  )
}

const mapStateToProps = (state) => ({
  locations: state.locations,
  orderList: state.orderList,
  orderTotal: state.orderTotal,
})

export default connect(mapStateToProps)(DeliveryNav)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mapStyle: {
    flex: 1
  },
})
