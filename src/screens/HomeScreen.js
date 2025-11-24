import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const gloveImage = require('../assets/boxing_gloves.png');
export default function HomeScreen({ handleNavigate, styles, theme }) {
	const navigation = useNavigation();
	return (
		<LinearGradient colors={theme.gradient || [theme.primary, theme.secondary]} style={styles.container}>
			<Image
				source={gloveImage}
				style={{ width: 120, height: 120, alignSelf: 'center', marginVertical: 24, shadowColor: theme.secondary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 6 }}
			/>

			<Text style={[styles.header, { fontWeight: 'bold', fontSize: 50, textShadowColor: "#000", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }]}>
				Boxing Combo Generator
			</Text>

			<Text style={[styles.statusText, { marginBottom: 30, fontStyle: 'italic', color: theme.primary }]}>
				Train smart, improve faster, and master your combos.
			</Text>

			<TouchableOpacity
				style={[styles.button, { minWidth: 200, backgroundColor: theme.primary, elevation: 4 }]}
				onPress={() => handleNavigate('Main')}
				activeOpacity={0.85}
			>
				<Text style={styles.buttonText}>Start Training</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.button, { minWidth: 200, marginTop: 20, backgroundColor: theme.buttonBackground, elevation: 2 }]}
				onPress={() => navigation.navigate('Instructions')}
				activeOpacity={0.85}
			>
				<Text style={styles.buttonText}>Instructions / Info</Text>
			</TouchableOpacity>

			<Text style={{ marginTop: 40, color: theme.primary, fontWeight: '600', fontSize: 16 }}>
				"Champions are made, not born!"
			</Text>
		</LinearGradient>
	);
}

