import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { Item, Input, Label } from 'native-base'
import { AntDesign, Entypo } from '@expo/vector-icons'
import PrimarySubmitButton from './PrimarySubmitButton'
import { connect } from 'react-redux'
import { estimateDelivery } from '../redux/actions/orderListActions'

const DestinationAddress = ({ navigation, estimate }) => {
  const [formValue, setFormValue] = useState({})
  const inputs = ['Address', 'City', 'ZIP', 'Phone', 'Email']

  const onChangeValues = (val, name) => {
    const newFormValue = {
      ...formValue,
      [name]: val
    }
    setFormValue(newFormValue)
  }

  const onSubmit = () => {
    estimate(formValue)
    navigation.navigate('PaymentInformation')
  }

  return (
    <SafeAreaView>
      <View style={styles.topNav}>
        <AntDesign
          name="back"
          size={30}
          onPress={() => navigation.goBack()}
          color='grey'
          style={styles.backArrow}
        />
        <Text style={styles.title}>Destination address:</Text>
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
          text='Finish & Pay'
        />
      </View>
    </SafeAreaView>
  )
}

const mapDispatchToProps = (dispatch) => ({
  estimate: (address) => dispatch(estimateDelivery(address)),
})

export default connect(null, mapDispatchToProps)(DestinationAddress)


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
  }
})
