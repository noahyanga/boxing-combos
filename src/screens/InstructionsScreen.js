import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function InstructionsScreen({ styles, theme }) {
	const navigation = useNavigation();
	return (
		<View style={[styles.container, { backgroundColor: theme.background[0], padding: 20, flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
			<Text style={[styles.header, { color: theme.primary, textAlign: 'center' }]}>
				How To Use This App
			</Text>

			<Text style={[styles.statusText, { marginBottom: 12, color: theme.text }]}>
				• Start training to hear combos and see them visually.
			</Text>
			<Text style={[styles.statusText, { marginBottom: 12, color: theme.text }]}>
				• Use focus and difficulty settings to customize your experience.
			</Text>
			<Text style={[styles.statusText, { marginBottom: 12, color: theme.text }]}>
				• Press 'Next Combo' anytime to skip to another combination.
			</Text>
			<Text style={[styles.statusText, { marginBottom: 12, color: theme.text }]}>
				• Use settings to adjust voice, theme, and punch display style.
			</Text>
			<Text style={[styles.statusText, { marginBottom: 12, color: theme.text }]}>
				• Rest periods help you recharge.
			</Text>

			<Text style={[styles.breakText, { marginTop: 20, color: theme.primary, textAlign: 'center' }]}>
				Enjoy your training and fight smart!
			</Text>

			<TouchableOpacity
				style={[styles.button, { minWidth: 200, backgroundColor: theme.primary }]}
				onPress={() => navigation.navigate('Home - Boxing Combo Generator')}
				activeOpacity={0.8}
			>
				<Text style={styles.buttonText}>Back to Home</Text>
			</TouchableOpacity>


		</View>
	);
}

