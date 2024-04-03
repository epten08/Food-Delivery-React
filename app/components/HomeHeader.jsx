import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import styles from '../screens/search.style'
import AssetImage from './AssetImage'
import { UserReversedGeoCode } from '../context/UserReversedGeoCode'
import { COLORS, SIZES } from '../constants/theme'
import { UserLocationContext } from '../context/UserLocationContext'
import * as Location from "expo-location";


const HomeHeader = () => {
    const {address,setAddress} = useContext(UserReversedGeoCode);
    const {location,setLocation} = useContext(UserLocationContext);

    useEffect(() => {
        if(location !== null ){
            reverseGeoCode(location.coords.latitude,location.coords.longitude);
        }
    },[location])

    const reverseGeoCode = async(latitude,longitude) => {
        const reversedGeoCodedAddress = await Location.reverseGeocodeAsync({
            longitude: longitude,
            latitude: latitude
        });
        setAddress(reversedGeoCodedAddress[0]);
    }

  return (
    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={styles.outerStyle}>
        <AssetImage data={require('../../assets/images/profile.jpg')}
            width={55}
            height={55}
            mode={'cover'}
            radius={99}
        />
        <View style={styles.headerStyles}>
            <Text style={styles.heading}>Deliverying To</Text>
            <Text style={styles.location}>{`${address.city} ${address.name}`}</Text>
        </View>
      </View>
    </View>
  )
}

export default HomeHeader;

const styles = StyleSheet.create({
    outerStyle: {
        marginBottom:10,
        marginHorizontal:20,
        flexDirection:'row'
    },
    headerStyles:{
        marginLeft:15,
        justifyContent:"center"
    },
    heading:{
        fontFamily:'medium',
        fontSize: SIZES.medium,
        color: COLORS.secondary
    },
    location:{
        fontFamily:'regular',
        fontSize: SIZES.small+2,
        color: COLORS.gray
    }
})