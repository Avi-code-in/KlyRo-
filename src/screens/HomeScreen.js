import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ImageBackground, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

const BG_IMAGE = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop';

export default function HomeScreen({ openCamera, openChat, openVoice, recents }) {
  return (
    <ImageBackground source={{ uri: BG_IMAGE }} style={styles.container}>
      <LinearGradient colors={['rgba(11,16,33,0.3)', COLORS.bgDark]} style={styles.overlay}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 40, marginBottom: 30}}>
            <Text style={{color: COLORS.textLight, fontSize: 32, fontWeight: 'bold'}}>Hello, Explorer</Text>
            <Text style={{color: COLORS.textGray, fontSize: 15, marginTop: 5}}>See more. Know more. Do more.</Text>
          </View>

          <TouchableOpacity onPress={openCamera} activeOpacity={0.8}>
            <LinearGradient colors={['rgba(0,229,255,0.15)', 'rgba(0,229,255,0.02)']} style={styles.startBtn}>
              <View style={styles.iconBg}><Ionicons name="scan" size={24} color={COLORS.primary} /></View>
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={{color: COLORS.textLight, fontSize: 18, fontWeight: 'bold'}}>Start Exploring</Text>
                <Text style={{color: COLORS.textGray, fontSize: 12, marginTop: 4}}>Point camera & AI will see the world</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity style={styles.card} onPress={openChat}>
              <Ionicons name="chatbubbles" size={24} color={COLORS.secondary} />
              <Text style={styles.cardTitle}>AI Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={openVoice}>
              <Ionicons name="mic" size={24} color={COLORS.accent} />
              <Text style={styles.cardTitle}>Voice Agent</Text>
            </TouchableOpacity>
          </View>

          <Text style={{color: COLORS.textLight, fontSize: 18, fontWeight: 'bold', marginTop: 10}}>Recent Scans</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 15 }}>
            {recents.map((item, index) => (
              <View key={index} style={styles.recentCard}>
                <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.recentImg} />
                <Text style={styles.recentTitle} numberOfLines={1}>{item.data.name}</Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  overlay: { flex: 1, padding: 20 },
  startBtn: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(0,229,255,0.3)', marginBottom: 20 },
  iconBg: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(0,229,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  card: { width: '48%', backgroundColor: COLORS.glassDark, padding: 20, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  cardTitle: { color: COLORS.textLight, fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  recentCard: { marginRight: 15, backgroundColor: COLORS.glassDark, borderRadius: 15, padding: 8, width: 110 },
  recentImg: { width: '100%', height: 100, borderRadius: 10, backgroundColor: '#222' },
  recentTitle: { color: COLORS.textLight, fontSize: 13, marginTop: 8, fontWeight: '600' }
});
