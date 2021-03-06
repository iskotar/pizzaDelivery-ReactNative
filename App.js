import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/Tabs'
import { Provider } from 'react-redux'
import store from './redux/store'
import DestinationAddress from './screens/Cart/DestinationAddress'
import PaymentInformation from './screens/Cart/PaymentInformation'
import DeliveryNav from './screens/Delivery/DeliveryNav'
import Order from './screens/Order/Order'
import LocationLayout from './layouts/LocationLayout'
import Cart from './screens/Cart/Cart'

const Stack = createStackNavigator()

export default function App () {

  return (
    <Provider store={store}>
      <LocationLayout>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name='Home' component={Tabs}/>
            <Stack.Screen name='Order' component={Order}/>
            <Stack.Screen name='Cart' component={Cart}/>
            <Stack.Screen name='DestinationAddress' component={DestinationAddress}/>
            <Stack.Screen name='PaymentInformation' component={PaymentInformation}/>
            <Stack.Screen name='DeliveryNav' component={DeliveryNav}/>
          </Stack.Navigator>
        </NavigationContainer>
      </LocationLayout>
    </Provider>
  )
}
