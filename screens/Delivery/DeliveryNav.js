import React, { useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux'
import Restaurants from './Restaurants'
import Route from './Route'
import IncomingCallDialog from './IncomingCallDialog'
import DeliveryCar from './DeliveryCar'
import DelivererInfo from './DelivererInfo'
import OutgoingCallDialog from './OutgoingCallDialog'
import FinishOrder from './FinishOrder'
import Carousel from 'react-native-snap-carousel'
import { GOOGLE_MAP_API_KEY } from '../../constants'

const DeliveryNav = ({ locations, orderList, orderTotal, navigation }) => {
  const [showCallDialog, setShowCallDialog] = useState(false)
  const [showDialDialog, setShowDialDialog] = useState(false)
  const [showFinishOrder, setShowFinishOrder] = useState(false)
  const [routePoints, setRoutePoints] = useState([])
  const [selectedMarker, setSelectedMarker] = useState(0)
  const _carouselRef = React.useRef()
  const _mapRef = React.useRef()

  const destinationAddress = (() => {
    if (orderTotal.isPayed) return orderTotal.destination.address.trim() || locations.userLocation
  })()

  useEffect(() => {
    if (!destinationAddress) setRoutePoints([])
  }, [destinationAddress])

  const onCarouselItemChange = (idx) => {
    let loc = locations.restaurants[idx].geometry.location

    _mapRef.current.animateToRegion({
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035
    })

    setSelectedMarker(idx)
  }

  const onSelectMarker = (idx) => {
    setSelectedMarker(idx)
    _carouselRef.current.snapToItem(idx)
  }

  const cardItem = ({ item }) => {
    if (destinationAddress) return null;

    return (
      <View
        style={styles.cardContainer}
      >
        <View style={styles.cardTitle}>
          <Text style={[styles.cardName, styles.whiteBoldText]} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.whiteBoldText} numberOfLines={1}>{item.vicinity}</Text>
        </View>
        <Image
          style={styles.cardImage}
          source={{
            uri: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photos[0].photo_reference}&maxheight=500&maxwidth=500&key=${GOOGLE_MAP_API_KEY}`
          }}
        />
        <Text
          style={[styles.cardButton, styles.whiteBoldText]}
          onPress={() => navigation.navigate('Order', { vicinity: item.vicinity })}
        >
          TAP TO ORDER
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={_mapRef}
        style={styles.mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={locations.userLocation}
        showsUserLocation
        getMarkersFrames
      >
        <Restaurants
          isHidden={destinationAddress}
          locations={locations}
          onSelectMarker={onSelectMarker}
          selectedMarker={selectedMarker}
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

      <Carousel
        ref={_carouselRef}
        data={locations.restaurants}
        renderItem={cardItem}
        onSnapToItem={onCarouselItemChange}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={320}
        containerCustomStyle={styles.carousel}
      />

      <DelivererInfo
        isHidden={!destinationAddress}
        onShowDialDialog={() => setShowDialDialog(true)}
      />
      <IncomingCallDialog
        show={!showDialDialog && showCallDialog}
        onHideCallDialog={setShowCallDialog}
        onShowFinishOrder={() => setShowFinishOrder(true)}
        onShowCallDialog={setShowCallDialog}
      />
      <OutgoingCallDialog
        show={showDialDialog}
        onHide={() => setShowDialDialog(false)}
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

  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 200,
    overflow: 'hidden',
    borderColor: '#adcd34',
    borderWidth: 1
  },

  cardTitle: {
    padding: 5,
    height: 50
  },

  cardName: {
    fontSize: 18
  },

  whiteBoldText: {
    fontWeight: '500'
  },

  cardImage: {
    height: 120
  },

  cardButton: {
    textAlign: 'center',
    padding: 5,
    height: 30,
    color: 'white',
    backgroundColor: '#adcd34',
  },

  carousel: {
    position: 'absolute',
    bottom: 110,
    width: '100%'
  }
})
