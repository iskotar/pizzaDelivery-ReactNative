import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'

export const AppModal = ({ onShow, onSubmit, onClose, children, submitBtnName }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={onShow}
    >
      <View style={styles.modalView}>
        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Entypo name='cross' size={40} color='#adcd34'/>
        </Pressable>
        {children}
        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            {submitBtnName}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    marginVertical: '8%',
    padding: 10,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 50,
  },

  closeBtn: {
    width: '100%',
    alignItems: 'flex-end'
  },

  button: {
    padding: 15,
    borderRadius: 30,
    borderColor: '#adcd34',
    borderWidth: 1,
  }
})
