import { Image, Text, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { pizzaSizes } from '../../constants'
import pizza from '../../assets/pizza.png'
import { Slider } from 'react-native-elements'

const PizzaOptions = ({ currentSelection, setOrder }) => {
  const [selectedSize, setSelectedSize] = useState(pizzaSizes[1])
  const [selectedCheese, setSelectedCheese] = useState({ val: 2, lvl: 'Regular' })

  useEffect(() => {
    setOrder({
      cheese: selectedCheese.lvl,
      size: selectedSize.name,
      image: currentSelection.image,
      name: currentSelection.name,
      price: currentSelection.basePrice + selectedSize.price + (selectedCheese.val > 2 ? 1.50 : selectedCheese.val < 2 ? -1.5 : 0)
    })
  }, [selectedSize, selectedCheese])

  const onSetCheese = (val) => {
    if (val === 1) setSelectedCheese({ val, lvl: 'Minimum' })
    if (val === 2) setSelectedCheese({ val, lvl: 'Regular' })
    if (val === 3) setSelectedCheese({ val, lvl: 'Double' })
  }

  return (
    <ScrollView
      style={styles.content}
      ref={(scrollView) => scrollView && scrollView.flashScrollIndicators()}
      scrollIndicatorInsets={{ right: -3 }}
      indicatorStyle='black'
    >
      <Text style={styles.title}>{currentSelection.name}</Text>

      <Image source={currentSelection.image} style={styles.image}/>

      <Text style={styles.font}>Select a Pizza Size</Text>

      <View style={styles.sizeList}
      >
        {
          pizzaSizes.map((size, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.sizeElement,
                styles.shadow,
                {
                  backgroundColor: size.name === selectedSize.name ? '#adcd34' : 'white',
                }]}
              onPress={() => setSelectedSize(size)}
            >
              <View style={styles.sizeImageBg}>
                <Image source={pizza} style={{
                  width: size.name * 2.5,
                  height: size.name * 2.5
                }}/>
              </View>
              <Text style={[
                styles.sizeFont, {
                  color: size.name === selectedSize.name ? 'white' : 'black',
                }]}>
                {size.name}'
              </Text>
              <Text style={{ color: 'white' }}>+{size.price}$</Text>
            </TouchableOpacity>
          ))
        }
      </View>

      <View
        style={{
          marginTop: 20,
          marginBottom: 20
        }}
      >
        <Text style={styles.font}>How many cheese?</Text>

        <Slider
          value={selectedCheese.val}
          onSlidingComplete={(val) => onSetCheese(val)}
          maximumValue={3}
          minimumValue={1}
          step={1}
          thumbStyle={{ height: 30, width: 30, backgroundColor: '#adcd34' }}
          thumbTouchSize={{ height: 30, width: 30 }}
          style={styles.shadow}
        />

        <Text style={styles.cheeseLvlFont}>{selectedCheese.lvl}</Text>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    fontSize: 20
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#adcd34'
  },

  image: {
    borderRadius: 5,
    marginBottom: 20
  },

  font: {
    fontSize: 20,
  },

  sizeList: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between'
  },

  sizeElement: {
    padding: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  sizeImageBg: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },

  sizeFont: {
    fontWeight: 'bold',
    marginTop: 5
  },

  shadow: {
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 5
  },

  cheeseLvlFont: {
    fontSize: 24,
    color: '#adcd34'
  }
})

export default PizzaOptions
