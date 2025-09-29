import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function InstructionsScreen({ styles, theme }) {
	return (
		<ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
			<Text style={styles.header}>How To Use This App</Text>

			<Text style={[styles.statusText, { marginBottom: 12 }]}>
				• Start training to hear combos and see them visually.
			</Text>
			<Text style={[styles.statusText, { marginBottom: 12 }]}>
				• Use focus and difficulty settings to customize your experience.
			</Text>
			<Text style={[styles.statusText, { marginBottom: 12 }]}>
				• Press 'Next Combo' anytime to skip to another combination.
			</Text>
			<Text style={[styles.statusText, { marginBottom: 12 }]}>
				• Use settings to adjust voice, theme, and punch display style.
			</Text>
			<Text style={[styles.statusText, { marginBottom: 12 }]}>
				• Rest periods help you recharge.
			</Text>

			<Text style={[styles.breakText, { marginTop: 20 }]}>
				Enjoy your training and fight smart!
			</Text>
		</ScrollView>
	);
}

