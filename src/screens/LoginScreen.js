import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

export default function LoginScreen({ onLogin }) {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.bgLight}}>
      <LinearGradient colors={['#D4E4F7', '#E8EEF5']} style={StyleSheet.absoluteFillObject} />
      <View style={{flex: 1, padding: 20, justifyContent: 'center'}}>
        
        <View style={{alignItems: 'flex-end', marginBottom: 20}}>
          <TouchableOpacity onPress={onLogin}><Text style={{color: '#64748B', fontSize: 16, fontWeight: '500'}}>Skip →</Text></TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', marginBottom: 40}}>
          <Text style={{fontSize: 32, fontWeight: '900', color: COLORS.textDark, letterSpacing: 1}}>KlyRo</Text>
          <Text style={{fontSize: 14, color: '#64748B', marginTop: 5, textAlign: 'center'}}>See More. Know More.{"\n"}Do More.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey with KlyRo</Text>

          <TouchableOpacity onPress={onLogin} style={styles.socialBtn}>
            <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'}} style={{width: 20, height: 20, marginRight: 10}} />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialBtn, {marginTop: 10}]}>
            <Ionicons name="logo-apple" size={20} color="#000" style={{marginRight: 10}} />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} /><Text style={{marginHorizontal: 10, color: '#94A3B8'}}>or</Text><View style={styles.line} />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={20} color="#94A3B8" style={{marginRight: 10}} />
            <TextInput placeholder="Email address" placeholderTextColor="#94A3B8" style={styles.input} />
          </View>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" style={{marginRight: 10}} />
            <TextInput placeholder="Password" placeholderTextColor="#94A3B8" secureTextEntry style={styles.input} />
          </View>

          <TouchableOpacity onPress={onLogin}>
            <LinearGradient colors={['#8B5CF6', '#3B82F6']} style={styles.signInBtn}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Sign In →</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.glassLight, borderRadius: 30, padding: 25, elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.textDark, textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#64748B', textAlign: 'center', marginBottom: 25 },
  socialBtn: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  socialText: { color: COLORS.textDark, fontSize: 16, fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#CBD5E1' },
  inputBox: { flexDirection: 'row', backgroundColor: '#F8FAFC', borderRadius: 15, paddingHorizontal: 15, paddingVertical: 12, alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  input: { flex: 1, fontSize: 16, color: COLORS.textDark },
  signInBtn: { width: '100%', padding: 16, borderRadius: 15, alignItems: 'center', marginTop: 10 }
});
