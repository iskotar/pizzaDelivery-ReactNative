import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { pizzaTypes } from '../constants'
import PizzaOptions from '../components/PizzaOptions'
import { AppModal } from '../components/AppModal'
import { connect } from 'react-redux'
import { addToOrder } from '../redux/actions/orderListActions'

export const Order = ({ addToOrderList }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [currentSelection, setCurrentSelection] = useState()
  const [order, setOrder] = useState({})

  const onAddToOrder = () => {
    addToOrderList(order)
    setShowOptions(false)
  }

  const onCurrentPizza = (pizza) => {
    setCurrentSelection(pizza);
    setShowOptions(true);
  }

  const RenderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.locationBtn}
        >
          <Entypo name='location-pin' size={30} color='black'/>
        </TouchableOpacity>

        <View style={styles.locationAddress}>
          <Text>524 Baker Street</Text>
        </View>
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
    <SafeAreaView style={styles.container}>
      <RenderHeader/>
      <ScrollView style={{ }}>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    marginBottom: 70
  },

  header: {
    flexDirection: 'row',
    height: 50,
    marginBottom: 10,
    justifyContent: 'space-between',
    marginHorizontal: 20
  },

  locationBtn: {
    width: 50,
    justifyContent: 'center'
  },

  locationAddress: {
    width: '70%',
    height: '100%',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  },

  pizzaType: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center'
  },

  pizzaImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 10,
    borderColor: '#adcd34',
    borderWidth: 5
  }
})

const mapDispatchToProps = (dispatch) => ({
  addToOrderList: (item) => dispatch(addToOrder(item)),
})

export default connect(null, mapDispatchToProps)(Order)
