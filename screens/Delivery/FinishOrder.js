import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PrimarySubmitButton from '../../components/PrimarySubmitButton'
import { resetOrder, resetTotal } from '../../redux/actions/orderListActions'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

const FinishOrder = ({ show, onHide, resetOrder, resetTotal }) => {
  if (!show) return null

  const onClose = () => {
    resetOrder()
    resetTotal()
    onHide()
  }

  return (
    <View
      style={styles.body}
    >
      <Ionicons name="pizza" size={100} color='#adcd34'/>

      <Text style={styles.text}>Your order is delivered!</Text>

      <PrimarySubmitButton
        text='Confirm'
        onPress={onClose}
      />
    </View>
  )
}

const mapDispatchToProps = (dispatch) => ({
  resetOrder: () => dispatch(resetOrder()),
  resetTotal: () => dispatch(resetTotal()),
})

export default connect(null, mapDispatchToProps)(FinishOrder)

const styles = StyleSheet.create({
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    fontSize: 24,
    marginVertical: 20
  }
})
