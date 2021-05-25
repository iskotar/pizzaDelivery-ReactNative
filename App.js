import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './navigation/Tabs'
import { Provider } from 'react-redux'
import store from './redux/store'
import DestinationAddress from './components/DestinationAddress'
import PaymentInformation from './components/PaymentInformation'

const Stack = createStackNavigator()

export default function App () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='Home' component={Tabs}/>
          <Stack.Screen name='DestinationAddress' component={DestinationAddress}/>
          <Stack.Screen name='PaymentInformation' component={PaymentInformation}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
