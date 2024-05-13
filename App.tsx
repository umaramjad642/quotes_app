import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert, Share } from 'react-native';
import FontAwesome5Icon, { } from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const { height, width } = Dimensions.get('window');


export default function App() {

  const [quote, setQuote] = useState('The World is my country, all mankind are my brethren, and to do good is my religion.');
  const [auther, setAuther] = useState("Thomas Paine");

  useEffect(() => {
    randomQuote();
  }, [])

  const randomQuote = async () => {
    const url = 'https://api.quotable.io/random';
    const response = await fetch(url);
    const fndata = await response.json();
    setQuote(fndata.content)
    setAuther(fndata.author);
  }

  const copyClipBoard = async () => {
    await Clipboard.setStringAsync(quote + auther );
    Alert.alert(
      "Quote Copied"
    )
  }

  const ShareBtn = async () => {
    try {
      const result = await Share.share({
        message: quote
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent={false}/>
      <View style={styles.inercontainer}>
        <Text style={{ fontSize: 28, textAlign: 'center', color: 'white', fontWeight: 'bold', marginBottom: 10 }}>Quotes of the Day</Text>
        <FontAwesome5Icon name='quote-left' size={20} color={'black'} style={{ marginBottom: -12 }} />
        <Text style={{ fontSize: 18, letterSpacing: 2, lineHeight: 26, fontWeight: '400', textAlign: 'center', paddingHorizontal: 25 }}>
          {quote}
        </Text>
        <FontAwesome5Icon name='quote-right' size={20} color={'black'} style={{ marginTop: -12, textAlign: 'right' }} />
        <Text style={{ fontSize: 16, fontWeight: '500', fontStyle: 'italic', textAlign: 'right', paddingTop: 10 }}>{"--- " + auther}</Text>
        <TouchableOpacity
          onPress={randomQuote}
          style={{
            backgroundColor: '#A0DEFF',
            borderRadius: 30,
            marginVertical: 15,
            padding: 15
          }}>
          <Text style={{ fontSize: 22, textAlign: 'center', color: 'white' }}>New Quotes</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {/*  Copy Button */}
          <TouchableOpacity
            onPress={copyClipBoard}
            style={{
              borderColor: '#A0DEFF',
              borderWidth: 2,
              borderRadius: 50,
              marginVertical: 10,
              padding: 15
            }}>
            <MaterialCommunityIcons name='content-copy' size={20} color={'white'} />
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity
            onPress={ShareBtn}
            style={{
              borderColor: '#A0DEFF',
              borderWidth: 2,
              borderRadius: 50,
              marginVertical: 10,
              padding: 15
            }}>
            <MaterialCommunityIcons name='share' size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A0DEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inercontainer: {
    backgroundColor: '#5AB2FF',
    width: width * 0.80,
    borderRadius: 20,
    padding: 20,

  }
});
