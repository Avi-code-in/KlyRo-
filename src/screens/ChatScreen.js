import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

export default function ChatScreen({ session, isTyping, onSendText, onNewChat, goBack }) {
  const [input, setInput] = useState('');
  const scrollViewRef = useRef();

  if (!session) return null;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={goBack} style={styles.iconBtn}><Ionicons name="arrow-back" size={22} color="#fff" /></TouchableOpacity>
        <Text style={{color:'#fff', fontSize:18, fontWeight:'bold'}}>KlyRo Agent</Text>
        <TouchableOpacity onPress={onNewChat} style={styles.iconBtn}><Ionicons name="add" size={24} color="#fff" /></TouchableOpacity>
      </View>

      <ScrollView style={{flex: 1, padding: 20}} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {session.messages.map((msg, index) => (
          <View key={index} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={{color: '#fff', fontSize: 15}}>{msg.text}</Text>
          </View>
        ))}
        {isTyping && <ActivityIndicator color={COLORS.primary} style={{alignSelf: 'flex-start', marginLeft: 10}} />}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Ask KlyRo anything..." placeholderTextColor={COLORS.textGray} value={input} onChangeText={setInput} onSubmitEditing={() => { onSendText(input); setInput(''); }} />
          <TouchableOpacity onPress={() => { onSendText(input); setInput(''); }} style={styles.sendBtn}><Ionicons name="send" size={20} color="#000" /></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginTop: 30 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.glassDark, justifyContent: 'center', alignItems: 'center' },
  bubble: { padding: 15, borderRadius: 20, marginBottom: 15, maxWidth: '85%' },
  userBubble: { backgroundColor: 'rgba(0, 229, 255, 0.2)', alignSelf: 'flex-end', borderBottomRightRadius: 0 },
  aiBubble: { backgroundColor: COLORS.glassDark, alignSelf: 'flex-start', borderBottomLeftRadius: 0 },
  inputContainer: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  input: { flex: 1, backgroundColor: COLORS.glassDark, color: '#fff', borderRadius: 25, paddingHorizontal: 20, paddingVertical: 12, fontSize: 15 },
  sendBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }
});
