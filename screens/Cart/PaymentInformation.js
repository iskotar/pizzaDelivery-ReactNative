import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Item, Input, Label } from 'native-base'
import { Entypo, Ionicons } from '@expo/vector-icons'
import PrimarySubmitButton from '../../components/PrimarySubmitButton'
import { connect } from 'react-redux'
import { payAndFinish } from '../../redux/actions/orderListActions'

const PaymentInformation = ({ navigation, orderTotal, payAndFinish }) => {
  const [formValue, setFormValue] = useState({})
  const inputs = ['First name', 'Last name', 'Card number', 'Exp. date', 'CVC Code']
  const total = orderTotal.subtotal + orderTotal.tax + orderTotal.deliveryPrice

  const onChangeValues = (val, name) => {
    const newFormValue = {
      ...formValue,
      [name]: val
    }
    setFormValue(newFormValue)
  }

  const onSubmit = () => {
    payAndFinish(formValue)
    navigation.navigate('Home', { screen: 'DeliveryNav' })
  }

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={40}>
      <ScrollView>
        <View style={styles.topNav}>
          <Ionicons
            name="md-chevron-back"
            size={30}
            onPress={() => navigation.goBack()}
            color='grey'
            style={styles.backArrow}
          />
          <Text style={styles.title}>Estimate and Pay</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.totalInfo}>
            <View style={styles.infoSum}>
              <Text>Sub Total:</Text>
              <Text>Tax:</Text>
              <Text>Delivery:</Text>
              <Text style={styles.fontBold}>Total:</Text>
            </View>

            <View style={styles.infoSum}>
              <Text>$ {orderTotal.subtotal.toFixed(2)}</Text>
              <Text>$ {orderTotal.tax.toFixed(2)}</Text>
              <Text>$ {orderTotal.deliveryPrice.toFixed(2)}</Text>
              <Text style={styles.fontBold}>$ {total.toFixed(2)}</Text>
            </View>
          </View>

          <Text style={styles.textBold}>Delivery Address:</Text>
          <Text>{orderTotal.destination.address}</Text>

          <Text style={styles.textBold}>Contacting Information:</Text>
          <Text>{orderTotal.destination.email}</Text>
          <Text>{orderTotal.destination.phone}</Text>
        </View>

        <View style={styles.list}>
          {
            inputs.map((name, idx) => (
              <Item
                floatingLabel
                key={idx}
                style={styles.input}
              >
                <Label>{name}</Label>
                <Input
                  value={formValue.address}
                  onChangeText={(val) => val && onChangeValues(val, name)}
                />
              </Item>
            ))
          }

          <PrimarySubmitButton
            onPress={onSubmit}
            children={<Entypo name='credit-card' size={30} color='white'/>}
            text='Pay'
          />
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const mapStateToProps = (state) => ({
  orderTotal: state.orderTotal,
})

const mapDispatchToProps = (dispatch) => ({
  payAndFinish: (creditCard) => dispatch(payAndFinish(creditCard)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformation)

const styles = StyleSheet.create({
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },

  backArrow: {
    flex: 1
  },

  title: {
    flex: 3,
    fontWeight: 'bold',
    fontSize: 18
  },

  input: {
    marginBottom: 20
  },

  list: {
    padding: 10,
    alignItems: 'center'
  },

  totalInfo: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#adcd34',
    padding: 10,
    width: 180,
    marginVertical: 20
  },

  infoContainer: {
    alignItems: 'center'
  },

  infoSum: {
    alignItems: 'flex-end'
  },

  textBold: {
    fontWeight: 'bold',
    fontSize: 16
  }
})
