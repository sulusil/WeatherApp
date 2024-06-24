import React, { useState } from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import axios from 'axios'
import WeatherSearch from './src/components/weatherSearch'
import WeatherInfo from './src/components/weatherInfo'
import { BASE_URL, API_KEY } from './src/constant'

const Item = ({title}) => (
  <View style ={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

export default function App() {

  const [weatherData, setWeatherData] = useState()
  const [status, setStatus] = useState('')

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return <WeatherInfo weatherData={weatherData} />
      case 'error':
        return (
          <Text>
            Something went wrong. Please try again with a correct city name.
          </Text>
        )
      default:
        return
    }
  }

  const searchWeather = (location) => {
    setStatus('loading')
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp -= 273.15
        data.main.temp = data.main.temp.toFixed(2)
        setWeatherData(data)
        setStatus('success')
      })
      .catch((error) => {
        console.log(error)
        setStatus('error')
      })
  }

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather}/>
      {/* {weatherData && <WeatherInfo weatherData={weatherData}/>} dihapus karena sudah menggunakan function render component */} 
      <View style={styles.margintTop20}>{renderComponent()}</View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5bf7d',
  },
})


