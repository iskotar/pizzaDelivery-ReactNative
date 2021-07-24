import React, { useEffect } from 'react'
import { View, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {
  decreaseOrderCount,
  deleteFromOrder,
  increaseOrderCount,
  passOrderListToTotal,
  resetOrder,
  resetTotal
} from '../../redux/actions/orderListActions'
import { Icon, SwipeRow, Button } from 'native-base'
import { Entypo } from '@expo/vector-icons'
import PrimarySubmitButton from '../../components/PrimarySubmitButton'
import DestinationAddress from './DestinationAddress'
import { useFocusEffect } from '@react-navigation/native'

const Cart = ({
                orderList,
                subtotal,
                deleteItem,
                orderCountPlus,
                orderCountMinus,
                navigation,
                passOrdersToTotal,
                isPayed,
                resetTotal,
                resetOrder
              }) => {

  useFocusEffect(
    React.useCallback(() => {
      console.log('Cart mounted')

      return () => {
        console.log('Cart UNmounted')
      };
    }, [navigation])
  )

  useEffect(() => {
    passOrdersToTotal()
  }, [orderList])

  const cancelOrder = () => {
    resetOrder()
    resetTotal()
  }

  const Row = ({ el }) => {

    return (
      <View style={styles.row}>

        <Image source={el.image} style={styles.image}/>

        <View style={styles.info}>
          <View>
            <Text style={styles.fontBold}>{el.name}</Text>
            <Text>Size: {el.size}'</Text>
            <Text>Cheese: {el.cheese}</Text>
            <Button transparent onPress={() => deleteItem(el.id)}>
              <Text style={{ color: '#adcd34' }}>Remove</Text>
            </Button>
          </View>


          <View style={styles.priceContainer}>
            <Text style={[styles.price, styles.fontBold]}>${el.price}</Text>

            <View style={styles.countContainer}>
              <TouchableOpacity onPress={() => orderCountMinus(el.id, el.price)}>
                <Entypo name='circle-with-minus' size={30} color='#adcd34'/>
              </TouchableOpacity>
              <Text style={styles.count}>{el.count}</Text>
              <TouchableOpacity onPress={() => orderCountPlus(el.id, el.price)}>
                <Entypo name='circle-with-plus' size={30} color='#adcd34'/>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </View>
    )
  }

  const TotalOrdersInfo = () => {

    return (
      <View style={styles.infoContainer}>
        <View style={styles.totalInfo}>
          <PrimarySubmitButton
            onPress={() => orderList.length && navigation.navigate('DestinationAddress')}
            text='Checkout'
          />

          <View style={styles.infoSum}>
            <Text style={styles.fontBold}>Sub Total: ${subtotal.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={styles.fontBold}>Cart:</Text>
      </View>
      <ScrollView>
        {!isPayed ?
          <>
            <View style={styles.list}>
              {
                orderList.map((el) => (
                  <SwipeRow
                    key={el.id}
                    rightOpenValue={-75}
                    disableRightSwipe
                    preview
                    style={{ height: 107 }}
                    right={
                      <Button danger onPress={() => deleteItem(el.id)}>
                        <Icon active name="trash"/>
                      </Button>
                    }
                    body={<Row el={el}/>}
                  />
                ))
              }
            </View>

            <TotalOrdersInfo/>
            </>
          :

          <View style={styles.infoContainer}>
            <View style={styles.totalInfo}>
              <PrimarySubmitButton
                onPress={cancelOrder}
                text='Cancel Order'
              />

              <View style={styles.infoSum}>
                <Text >Order Payed</Text>
              </View>
            </View>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  orderList: state.orderList,
  subtotal: state.orderTotal.subtotal,
  isPayed: state.orderTotal.isPayed,
})

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteFromOrder(id)),
  orderCountPlus: (id, price) => dispatch(increaseOrderCount(id, price)),
  orderCountMinus: (id, price) => dispatch(decreaseOrderCount(id, price)),
  passOrdersToTotal: () => dispatch(passOrderListToTotal()),
  resetOrder: () => dispatch(resetOrder()),
  resetTotal: () => dispatch(resetTotal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    alignItems: 'center'
  },

  list: {
    marginBottom: 30
  },

  row: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    height: 90,
    flex: 1
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },

  image: {
    width: 90,
    height: 90,
    marginRight: 10
  },

  price: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#adcd34',
    padding: 5
  },

  fontBold: {
    fontWeight: 'bold',
    fontSize: 18
  },

  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  countContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  count: {
    fontSize: 18,
    marginHorizontal: 5
  },

  totalInfo: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#adcd34',
    padding: 10,
    marginBottom: 120,
    width: '80%'
  },

  infoContainer: {
    alignItems: 'center'
  },

  infoSum: {
    alignItems: 'flex-end'
  }
})
