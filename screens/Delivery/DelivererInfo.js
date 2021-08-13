import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RoundButton from '../../components/RoundButton'
import { driver } from '../../constants'

const DelivererInfo = ({ isHidden, onShowDialDialog }) => {
  if (isHidden) return null

  return (
    <View style={styles.body}>
      <View style={styles.avatarBackground}>
        <Image
          source={driver.avatar}
          style={styles.avatar}
        />
      </View>

      <View style={styles.content}>
        <View
          style={styles.textContainer}
        >
          <Text>Driver</Text>
          <Text style={{ fontSize: 24}}>{driver.name}</Text>
        </View>

        <RoundButton
          onPress={onShowDialDialog}
          size={60}
          children={
            <Feather name="phone" size={35} color="white"/>
          }
        />
      </View>
    </View>
  )
}

export default DelivererInfo

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 40,
    padding: 10,
    borderRadius: 50
  },

  avatar: {
    borderColor: '#adcd34',
    borderWidth: 2,
    borderRadius: 50,
    overflow: 'hidden',
    height: 100,
    width: 100
  },

  avatarBackground: {
    backgroundColor: 'white',
    borderRadius: 60,
    borderTopRightRadius: 0,
    padding: 10
  },

  content: {
    backgroundColor: 'white',
    height: 80,
    marginLeft: -10,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    flexDirection: 'row',
    padding: 10
  },

  textContainer: {
    justifyContent: 'space-around',
    marginRight: 15
  }
})
