import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';
import { useAudioRecorder, requestRecordingPermissionsAsync, setAudioModeAsync, RecordingPresets } from 'expo-audio';

export default function VoiceScreen({ goBack, onSendVoice }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  useEffect(() => {
    if (isRecording) {
      Animated.loop(Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.5, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true })
      ])).start();
    } else { pulseAnim.setValue(1); }
  }, [isRecording]);

  async function startRecording() {
    try {
      const status = await requestRecordingPermissionsAsync();
      if (status.granted) {
        await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
        await audioRecorder.prepareToRecordAsync(RecordingPresets.HIGH_QUALITY);
        await audioRecorder.record();
        setIsRecording(true);
      }
    } catch (err) { Alert.alert('Error', 'Mic error'); }
  }

  async function stopRecording() {
    if (!isRecording) return;
    setIsRecording(false);
    setIsProcessing(true);
    await audioRecorder.stop();
    setTimeout(() => {
      onSendVoice("Mujhe KlyRo ke baare mein batao."); 
      setIsProcessing(false);
      goBack();
    }, 2000);
  }

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <TouchableOpacity onPress={goBack} style={[styles.iconBtn, {position: 'absolute', top: 50, left: 20}]}><Ionicons name="arrow-back" size={22} color="#fff" /></TouchableOpacity>
      <Text style={{color:'#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>{isProcessing ? "Thinking..." : isRecording ? "Listening..." : "Tap to Speak"}</Text>
      <View style={{height: 100, justifyContent: 'center'}}>
         {isRecording && <Animated.View style={{width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,64,129,0.3)', transform: [{scale: pulseAnim}]}} />}
      </View>
      <TouchableOpacity onPress={isRecording ? stopRecording : startRecording} disabled={isProcessing} style={{width: 90, height: 90, borderRadius: 45, backgroundColor: isRecording ? COLORS.accent : COLORS.secondary, justifyContent: 'center', alignItems: 'center', elevation: 10}}>
        <Ionicons name={isProcessing ? "hourglass" : isRecording ? "stop" : "mic"} size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }
});
