import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import DeliveryNav from '../screens/Delivery/DeliveryNav'
import Cart from '../screens/Cart/Cart'
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Svg, { Path } from 'react-native-svg'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Badge } from 'react-native-elements'
import { connect } from 'react-redux'
import Pizzerias from '../screens/Pizzerias/Pizzerias'

const Tab = createBottomTabNavigator()

const Tabs = ({ orderList }) => {

  const TabBarCustomButton = ({ accessibilityState, accessibilityLabel, children, onPress }) => {
    const isSelected = accessibilityState.selected
    const isCart = !isSelected && accessibilityLabel.split(',')[0] === 'Cart'

    if (isSelected) return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}/>
          <Svg
            width={75}
            height={61}
            viewBox='0 0 75 61'
          >
            <Path
              d='M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z'
              fill='white'
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: 'white' }}/>
        </View>
        <TouchableOpacity
          style={styles.selectedButton}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    )

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 80,
          backgroundColor: 'white'
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {orderList.length && isCart ? <Badge value={orderList.length} badgeStyle={styles.badge}/> : null}
        {children}
      </TouchableOpacity>
    )
  }

  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            elevation: 0,
            bottom: 0,
            position: 'absolute',
            zIndex: 1
          }
        }}
      >
        <Tab.Screen
          name='Home'
          component={Pizzerias}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="pizza" size={30} color={focused ? '#adcd34' : 'gray'}/>
            ),
            tabBarButton: (props) => (
              <TabBarCustomButton {...props}/>
            )
          }}
        />
        <Tab.Screen
          name='Cart'
          component={Cart}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="cart" size={30} color={focused ? '#adcd34' : 'gray'}/>
            ),
            tabBarButton: (props) => (
              <TabBarCustomButton {...props}/>
            )
          }}
        />
        <Tab.Screen
          name='DeliveryNav'
          component={DeliveryNav}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo name="location" size={30} color={focused ? '#adcd34' : 'gray'}/>
            ),
            tabBarButton: (props) => (
              <TabBarCustomButton {...props}/>
            )
          }}
        />
      </Tab.Navigator>
      <View style={{ backgroundColor: '#fff', position: 'absolute', bottom: 0, height: 40, width: '100%', zIndex: 0 }}/>
    </>
  )
}

const mapStateToProps = (state) => ({
  orderList: state.orderList,
})

export default connect(mapStateToProps)(Tabs)

const styles = StyleSheet.create({
  selectedButton: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    borderColor: '#adcd34',
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },

  badge: {
    backgroundColor: '#adcd34',
    position: 'absolute',
    marginTop: 5
  }
})
