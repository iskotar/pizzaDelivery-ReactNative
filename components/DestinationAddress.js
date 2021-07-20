import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'
import { Item, Input, Label } from 'native-base'
import { Entypo, Ionicons } from '@expo/vector-icons'
import PrimarySubmitButton from './PrimarySubmitButton'
import { connect } from 'react-redux'
import { estimateDelivery } from '../redux/actions/orderListActions'

const initialState = {
  Address: '',
  City: '',
  ZIP: '',
  Phone: '',
  error: false
}

const DestinationAddress = ({ navigation, estimate }) => {
  const [state, setState] = useState(initialState)

  useEffect(() => () => setState(initialState), [])

  const inputs = ['Address', 'City', 'ZIP', 'Phone']

  const onChangeValues = (val, name) => {
    setState({ ...state, [name]: val, error: false })
  }

  const onSubmit = () => {

    const isAllFieldsFiled = inputs.every(field => state[field].length > 0)

    if (isAllFieldsFiled) {
      const destination = {
        address: `${state.Address} ${state.City} ${state.ZIP}`.trim(),
        phone: state.Phone
      }
      estimate(destination)
      navigation.navigate('PaymentInformation')
    } else setState({ ...state, error: true })
  }

  return (
    <SafeAreaView>
      <View style={styles.topNav}>
        <Ionicons
          name="md-chevron-back"
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
              <Label>{name}*</Label>
              <Input
                value={state[name]}
                onChangeText={(val) => onChangeValues(val, name)}
              />
            </Item>
          ))
        }

        {state.error &&
        <Text style={{ color: 'red' }}>
          All fields are required
        </Text>}

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
