import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, Modal } from 'react-native'
import { Feather } from '@expo/vector-icons'
import RoundButton from '../../components/RoundButton'
import { Audio } from 'expo-av'


const IncomingCallDialog = ({ show, onShowCallDialog, onShowFinishOrder, driver }) => {

  if (!show) return null

  const [soundToPlay, setSoundToPlay] = useState()
  const [isCallAccepted, setIsCallAccepted] = useState(false)

  useEffect(() => {
    (async () => {
      const soundObject = new Audio.Sound()
      await soundObject.loadAsync(require('../../assets/ringtone.mp3'))
      await soundObject.playAsync()
      await setSoundToPlay(soundObject)

      soundObject.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          soundObject.unloadAsync()
          onShowCallDialog(false)

          setTimeout(() => {
            onShowCallDialog(true)
          }, 3000)
        }
      })
    })()
  }, [])

  useEffect(() => {
    if (isCallAccepted) {
      soundToPlay.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) onDecline()
      })
    }
  },[isCallAccepted])

  const onDecline = () => {
    soundToPlay.unloadAsync()
    onShowCallDialog(false)

    if (isCallAccepted) onShowFinishOrder()
    else setTimeout(() => onShowCallDialog(true), 5000)
  }

  const onAccept = async () => {
    setIsCallAccepted(true)
    await soundToPlay.unloadAsync()
    await soundToPlay.loadAsync(driver.voice.delivered)
    await soundToPlay.playAsync()
  }

  return (
    <Modal>
      <View
        style={styles.backdrop}
      >

        <View style={styles.avatarContainer}>
          <View
            style={styles.avatar}
          >
            <Image source={driver.avatar}/>
          </View>

          <Text style={{ color: 'white', fontSize: 20 }}>
            {driver.name} calling...
          </Text>
        </View>

        <View style={styles.buttonContainer}>

          {
            !isCallAccepted && <RoundButton
              onPress={onAccept}
              children={<Feather name="phone-call" size={30} color="white"/>}
            />
          }

          <RoundButton
            onPress={onDecline}
            children={<Feather name="phone-off" size={30} color="white"/>}
            backgroundColor='red'
          />
        </View>
      </View>
    </Modal>
  )
}

export default IncomingCallDialog

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(21,21,21,0.94)',
    flex: 1,
    justifyContent: 'space-around'
  },

  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  avatarContainer: {
    alignItems: 'center'
  },

  avatar: {
    borderColor: '#adcd34',
    borderWidth: 2,
    borderRadius: 100,
    overflow: 'hidden',
    width: 200,
    marginBottom: 30
  }
})
