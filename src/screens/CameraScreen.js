import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

export default function CameraScreen({ closeCamera, onCapture }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef(null);

  if (!permission?.granted) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={{color:'#fff', marginBottom: 20}}>Camera permission needed</Text>
        <TouchableOpacity onPress={requestPermission} style={{backgroundColor: COLORS.primary, padding: 15, borderRadius: 15}}><Text style={{color:'#000'}}>Allow Camera</Text></TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current && !isScanning) {
      setIsScanning(true);
      try {
        const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.3 });
        onCapture(photo.base64);
      } catch (e) { console.log(e); }
      setIsScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFillObject} ref={cameraRef} facing="back" />
      <View style={styles.overlay}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={closeCamera} style={styles.iconBtn}><Ionicons name="close" size={22} color="#fff" /></TouchableOpacity>
          <View style={styles.pill}><Text style={{ color: '#fff', fontSize: 12 }}>Scanning...</Text></View>
          <View style={{width: 44}}/>
        </View>

        <View style={styles.reticle}>
          <View style={[styles.corner, { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 }]} />
          <View style={[styles.corner, { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 }]} />
          <View style={[styles.corner, { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 }]} />
          <View style={[styles.corner, { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 }]} />
        </View>

        <View style={styles.bottomBar}>
          <View style={styles.captureRow}>
            <View style={{width: 44, height: 44}} />
            <TouchableOpacity onPress={takePicture} style={styles.captureBtnOuter}>
              <LinearGradient colors={[COLORS.secondary, COLORS.primary]} style={styles.captureBtnInner}>
                {isScanning ? <ActivityIndicator color="#fff" /> : <Ionicons name="scan-circle" size={40} color="#fff" />}
              </LinearGradient>
            </TouchableOpacity>
            <Ionicons name="camera-reverse" size={28} color="#fff" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 30 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  pill: { backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20 },
  reticle: { width: 260, height: 260, alignSelf: 'center', position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: COLORS.primary },
  bottomBar: { paddingBottom: 40, paddingTop: 20, backgroundColor: 'rgba(0,0,0,0.6)', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  captureRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  captureBtnOuter: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  captureBtnInner: { width: 62, height: 62, borderRadius: 31, justifyContent: 'center', alignItems: 'center' }
});
