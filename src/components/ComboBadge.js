import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ComboBadge({ label, style, textStyle }) {
	return (
		<View style={[styles.badge, style]}>
			<Text style={[styles.label, textStyle]}>{label}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		backgroundColor: 'rgba(0,230,118,0.12)',
		borderRadius: 24,
		borderWidth: 2,
		borderColor: '#00e676',
		paddingVertical: 10,
		paddingHorizontal: 20,
		margin: 5,
		flexDirection: 'row',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#00e676',
		shadowOpacity: 0.5,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 5 },
	},
	label: {
		fontWeight: '700',
		fontSize: 25,
		color: '#00e676',
	},
});

