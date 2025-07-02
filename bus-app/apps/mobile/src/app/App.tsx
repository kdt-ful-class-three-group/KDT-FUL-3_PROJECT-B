// webview 컴포넌트 작성
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

// 플랫폼 별 경로
const getWebUrl = ()=>{
  if(Platform.OS === 'android'){
    return 'http://10.0.2.2:4200';
  } else {
    return 'http://localhost:4200';
  }
}

// webappscreen 컴포넌트
export default function App(){
  return (
    <View style={{flex:1}}>
      <WebView source={{uri:getWebUrl()}} style={{flex:1}}/>
    </View>
  )
}