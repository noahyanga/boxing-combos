import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ styles, theme }) {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome to Boxing Combos Trainer</Text>
			<Text style={[styles.statusText, { marginBottom: 30 }]}>
				Train smart, improve faster, and master your combos.
			</Text>

			<TouchableOpacity
				style={[styles.button, { minWidth: 200, backgroundColor: theme.primary }]}
				onPress={() => navigation.navigate('Main')}
				activeOpacity={0.8}
			>
				<Text style={styles.buttonText}>Start Training</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.button, { minWidth: 200, marginTop: 20, backgroundColor: theme.buttonBackground }]}
				onPress={() => navigation.navigate('Instructions')}
				activeOpacity={0.8}
			>
				<Text style={styles.buttonText}>Instructions / Info</Text>
			</TouchableOpacity>
		</View>
	);
}

