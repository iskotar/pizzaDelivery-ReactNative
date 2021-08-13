import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { pizzaTypes } from '../../constants'
import PizzaOptions from './PizzaOptions'
import { AppModal } from '../../components/AppModal'
import { connect } from 'react-redux'
import { addToOrder } from '../../redux/actions/orderListActions'
import { Badge } from 'react-native-elements'

const Order = ({ addToOrderList, orderList, navigation, route }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [currentSelection, setCurrentSelection] = useState()
  const [order, setOrder] = useState({})

  const onAddToOrder = () => {
    addToOrderList({
      ...order,
      address: route.params.vicinity,
      restaurant: route.params.name
    })
    setShowOptions(false)
  }

  const onCurrentPizza = (pizza) => {
    setCurrentSelection(pizza)
    setShowOptions(true)
  }

  const Header = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="md-chevron-back" size={30} color="white"/>
        </TouchableOpacity>

        <View style={styles.locationName}>
          <Text numberOfLines={1}>{route.params.vicinity}</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Home', { screen: 'Cart' })}
        >
          {orderList.length ?
            <Badge
              value={orderList.length}
              textStyle={{ color: 'black' }}
              badgeStyle={styles.badge}
            /> : null}
          <MaterialCommunityIcons name="cart" size={30} color={'white'}/>
        </TouchableOpacity>
      </View>
    )
  }

  const PizzaTypesList = () => {

    return (
      <View style={styles.list}>
        {
          pizzaTypes.map((type, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.pizzaType}
              onPress={() => onCurrentPizza(type)}
            >
              <Image
                source={type.image}
                style={styles.pizzaImage}
              />
              <Text style={{ fontSize: 20, }}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView>
        <PizzaTypesList/>
      </ScrollView>
      <AppModal
        onShow={showOptions}
        onSubmit={onAddToOrder}
        onClose={() => setShowOptions(false)}
        submitBtnName='Add to Cart'
      >
        <PizzaOptions currentSelection={currentSelection} setOrder={setOrder}/>
      </AppModal>
    </View>
  )
}

const mapStateToProps = (state) => ({
  orderList: state.orderList,
})

const mapDispatchToProps = (dispatch) => ({
  addToOrderList: (item) => dispatch(addToOrder(item)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Order)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 70
  },

  list: {
    marginBottom: 70,
    marginTop: 20
  },

  header: {
    flexDirection: 'row',
    backgroundColor: '#adcd34',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 1,
    justifyContent: 'space-between',
    display: 'flex',
    maxWidth: '100%',
  },

  locationName: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 20,
  },

  pizzaType: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },

  pizzaImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 10,
    borderColor: '#adcd34',
    borderWidth: 5
  },

  badge: {
    backgroundColor: 'white',
    position: 'absolute',
    right: -10,
    top: -10,
  }
})
