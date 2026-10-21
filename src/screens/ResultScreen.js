import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

export default function ResultScreen({ image, data, isLoading, goBack, save }) {
  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={StyleSheet.absoluteFillObject} />}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: 'rgba(0,0,0,0.5)' }]} />
      <View style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={goBack} style={styles.iconBtn}><Ionicons name="close" size={22} color="#fff" /></TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <LinearGradient colors={['rgba(15,23,42,0.95)', 'rgba(15,23,42,0.85)']} style={styles.card}>
            {isLoading ? <ActivityIndicator size="large" color={COLORS.primary} style={{margin: 20}} /> : data ? (
              <>
                <Text style={{color:'#fff', fontSize: 22, fontWeight: 'bold'}}>{data.name}</Text>
                <Text style={{color: COLORS.textGray, fontSize: 12, marginBottom: 10}}>{data.scientificName}</Text>
                <Text style={{color:'#ddd', fontSize: 14, marginBottom: 15}}>{data.description}</Text>
                <TouchableOpacity onPress={save} style={styles.saveBtn}><Text style={{color: COLORS.primary, fontWeight:'bold'}}>Save to Memories</Text></TouchableOpacity>
              </>
            ) : null}
          </LinearGradient>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  topBar: { flexDirection: 'row', padding: 20, marginTop: 30 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  cardContainer: { position: 'absolute', bottom: 40, left: 20, right: 20 },
  card: { padding: 20, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(0,229,255,0.3)' },
  saveBtn: { alignItems: 'center', backgroundColor: 'rgba(0,229,255,0.1)', padding: 16, borderRadius: 15 }
});
