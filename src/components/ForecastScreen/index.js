/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable no-alert */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../SearchBar';
import Icon from 'react-native-vector-icons//MaterialIcons';
import MapView from 'react-native-maps';
import api from '../../utils/api';
import {getFromLocalStorage, storeInLocalStorage} from '../../utils/helpers';

const RECENT_CITIES = 'recent_cities';

class ForecastScreen extends React.Component {
  state = {
    recentCities: [],
    currentCity: '',
    search: '',
    temperature: {},
    isSearchLoading: false,
  };

  async componentDidMount() {
    //load recent cities from local storage
    const recentCities = await getFromLocalStorage(RECENT_CITIES);
    if (recentCities && recentCities.length) {
      this.setState({recentCities});
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    //save cities updates in local storage
    const {recentCities} = this.state;
    if (prevState.recentCities.length !== recentCities.length) {
      await storeInLocalStorage(RECENT_CITIES, recentCities);
    }
  }

  onSubmitEditing = async () => {
    const {search, recentCities} = this.state;
    if (!search) {
      return;
    }
    await this.getWeather();
    if (this.state.recentCities.length === 5) {
      const recent = [search, ...recentCities.filter((_, i) => i !== 4)];
      this.setState({recentCities: recent});
    } else {
      const recent = [search, ...recentCities];
      this.setState({recentCities: recent});
    }
    this.setState({search: ''});
  };

  onRemoveCity = item => {
    const filtered = this.state.recentCities.filter(city => item !== city);
    this.setState({recentCities: filtered});
  };

  getWeather = async (city = this.state.search) => {
    try {
      this.setState({isSearchLoading: true});
      const {
        data: {main = null, coord = null, name = ''},
      } = await api.getWeather(city);
      main && this.setState({temperature: main});
      if (coord) {
        const center = {
          latitude: coord.lat,
          longitude: coord.lon,
        };
        this.map.animateCamera({center: center, zoom: 5}, 500);
      }
      this.setState({currentCity: name, isSearchLoading: false});
    } catch (error) {
      this.setState({isSearchLoading: false});
      alert(error.message);
    }
  };

  render() {
    const {
      recentCities,
      isSearchLoading,
      temperature,
      currentCity,
    } = this.state;
    return (
      <View>
        <SearchBar
          testID="search"
          value={this.state.search}
          onChangeText={search => this.setState({search})}
          onSubmitEditing={this.onSubmitEditing}
          placeholder="Search weather by city name"
          onItemPress={this.getWeather}
          onItemRemove={this.onRemoveCity}
          recentSearch={recentCities}
          isLoading={isSearchLoading}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <MapView
            style={styles.map}
            loadingEnabled={true}
            ref={map => {
              this.map = map;
            }}
          />
          {temperature.temp && (
            <View style={styles.textContainer}>
              <Text style={styles.city}>{currentCity}</Text>
              <Text style={styles.temperature}>{`${temperature.temp}°`} </Text>
              <Text style={styles.humidityPressureText}>
                <Text>{`${temperature.humidity} Humidity`}</Text>
                {'  '}
                <Text>{`${temperature.pressure} Pressure`}</Text>
              </Text>
              <Text style={styles.highLows}>{`${temperature.temp_max}° / ${
                temperature.temp_min
              }°`}</Text>
              <TouchableOpacity
                style={styles.refresh}
                onPress={() => this.getWeather(currentCity)}>
                <Icon name="cached" size={34} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  humidityPressureText: {
    fontSize: 18,
    marginTop: 5,
  },
  city: {
    fontSize: 20,
  },
  temperature: {
    fontSize: 60,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 25,
  },
  highLows: {
    fontSize: 22,
    marginTop: 10,
  },
  scrollContent: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  refresh: {
    marginTop: 15,
  },
});

export default ForecastScreen;
