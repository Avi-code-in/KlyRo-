import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

export default function MemoryScreen({ recents, chats, openChat }) {
  const [activeTab, setActiveTab] = useState('Scans');

  return (
    <View style={styles.container}>
      <Text style={{color:'#fff', fontSize: 32, fontWeight: 'bold'}}>History</Text>
      <View style={{flexDirection: 'row', marginVertical: 20}}>
        <TouchableOpacity onPress={() => setActiveTab('Scans')} style={[styles.tab, activeTab === 'Scans' && styles.activeTab]}><Text style={{color: activeTab === 'Scans' ? '#000' : '#fff'}}>Scans</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Chats')} style={[styles.tab, activeTab === 'Chats' && styles.activeTab]}><Text style={{color: activeTab === 'Chats' ? '#000' : '#fff'}}>Chats</Text></TouchableOpacity>
      </View>
      <ScrollView>
        {activeTab === 'Scans' ? (
          <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {recents.map((item, index) => (
              <View key={index} style={styles.memoryCard}>
                <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={{height: 120, borderRadius: 10, width: '100%'}} />
                <Text style={{color:'#fff', marginTop: 5}}>{item.data.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          chats.map((chat, index) => (
            <TouchableOpacity key={index} onPress={() => openChat(chat.id)} style={styles.chatCard}>
              <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
              <Text style={{color: '#fff', flex: 1, marginLeft: 10}} numberOfLines={1}>{chat.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark, padding: 20, paddingTop: 40 },
  tab: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, marginRight: 10, backgroundColor: COLORS.glassDark },
  activeTab: { backgroundColor: COLORS.primary },
  memoryCard: { width: '48%', backgroundColor: COLORS.glassDark, borderRadius: 15, padding: 10, marginBottom: 15 },
  chatCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.glassDark, padding: 15, borderRadius: 15, marginBottom: 10 }
});
