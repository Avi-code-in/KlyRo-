import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

// Components
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import ResultScreen from './src/screens/ResultScreen';
import ChatScreen from './src/screens/ChatScreen';
import VoiceScreen from './src/screens/VoiceScreen';
import MemoryScreen from './src/screens/MemoryScreen';

// Utils
import { COLORS } from './src/utils/theme';
import { fetchAIResponse, fetchVisionAIResponse } from './src/utils/api';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState('Home');
  const [activeScreen, setActiveScreen] = useState('login'); 
  const [capturedImage, setCapturedImage] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recents, setRecents] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const savedRecents = await AsyncStorage.getItem('@klyro_recents');
      if (savedRecents) setRecents(JSON.parse(savedRecents));
      
      const savedChats = await AsyncStorage.getItem('@klyro_chats');
      if (savedChats) {
        const parsed = JSON.parse(savedChats);
        setChatSessions(parsed);
        if(parsed.length > 0) setCurrentChatId(parsed[0].id);
      } else {
        createNewChat();
      }
    } catch (e) { console.log(e); }
  };

  const createNewChat = async () => {
    const newId = Date.now().toString();
    const newChat = { id: newId, title: "New Chat", messages: [{ role: 'model', text: 'Hello Explorer! Main KlyRo hoon.' }] };
    const updated = [newChat, ...chatSessions];
    setChatSessions(updated);
    setCurrentChatId(newId);
    await AsyncStorage.setItem('@klyro_chats', JSON.stringify(updated));
  };

  const updateChatSession = async (id, newMessages) => {
    const updated = chatSessions.map(c => c.id === id ? { ...c, title: newMessages.length > 1 ? newMessages[1].text.substring(0, 15) + '...' : c.title, messages: newMessages } : c);
    setChatSessions(updated);
    await AsyncStorage.setItem('@klyro_chats', JSON.stringify(updated));
  };

  const saveRecent = async (data, imgBase64) => {
    const newRecent = { id: Date.now().toString(), data, image: imgBase64 };
    const updated = [newRecent, ...recents].slice(0, 15);
    setRecents(updated);
    await AsyncStorage.setItem('@klyro_recents', JSON.stringify(updated));
  };

  // AI Calls
  const handleScan = async (base64) => {
    setCapturedImage(base64);
    setIsProcessing(true);
    setActiveScreen('result');
    const data = await fetchVisionAIResponse(base64);
    setAiData(data);
    await saveRecent(data, base64);
    setIsProcessing(false);
  };

  const handleChat = async (text, isVoice = false) => {
    if (!text.trim() || !currentChatId) return;
    const session = chatSessions.find(c => c.id === currentChatId);
    const newMessages = [...session.messages, { role: 'user', text }];
    await updateChatSession(currentChatId, newMessages);
    setActiveScreen('chat');
    setIsProcessing(true);

    const aiText = await fetchAIResponse(text);
    await updateChatSession(currentChatId, [...newMessages, { role: 'model', text: aiText }]);
    setIsProcessing(false);

    if (isVoice) Speech.speak(aiText, { language: 'hi-IN', pitch: 1.0, rate: 0.9 });
  };

  if (activeScreen === 'login') return <LoginScreen onLogin={() => setActiveScreen('tabs')} />;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {activeScreen === 'camera' && <CameraScreen closeCamera={() => setActiveScreen('tabs')} onCapture={handleScan} />}
      {activeScreen === 'result' && <ResultScreen image={capturedImage} data={aiData} isLoading={isProcessing} goBack={() => setActiveScreen('camera')} save={() => setActiveScreen('tabs')} />}
      {activeScreen === 'voice' && <VoiceScreen goBack={() => setActiveScreen('tabs')} onSendVoice={(text) => handleChat(text, true)} />}
      {activeScreen === 'chat' && (
        <ChatScreen session={chatSessions.find(c => c.id === currentChatId)} isTyping={isProcessing} onSendText={(text) => handleChat(text, false)} onNewChat={createNewChat} goBack={() => setActiveScreen('tabs')} />
      )}

      {activeScreen === 'tabs' && (
        <View style={{flex: 1}}>
          {activeTab === 'Home' && <HomeScreen openCamera={() => setActiveScreen('camera')} openChat={() => setActiveScreen('chat')} openVoice={() => setActiveScreen('voice')} recents={recents} />}
          {activeTab === 'Memory' && <MemoryScreen recents={recents} chats={chatSessions} openChat={(id) => { setCurrentChatId(id); setActiveScreen('chat'); }} />}
          
          <View style={styles.bottomTab}>
            <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Home')}>
              <Ionicons name={activeTab === 'Home' ? "home" : "home-outline"} size={22} color={activeTab === 'Home' ? COLORS.primary : COLORS.textGray} />
              <Text style={[styles.tabText, activeTab === 'Home' && { color: COLORS.primary }]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('Memory')}>
              <Ionicons name={activeTab === 'Memory' ? "folder" : "folder-outline"} size={22} color={activeTab === 'Memory' ? COLORS.primary : COLORS.textGray} />
              <Text style={[styles.tabText, activeTab === 'Memory' && { color: COLORS.primary }]}>History</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  bottomTab: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: COLORS.bgDark, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingBottom: 15 },
  tabItem: { alignItems: 'center' },
  tabText: { color: COLORS.textGray, fontSize: 10, marginTop: 5, fontWeight: '600' }
});
