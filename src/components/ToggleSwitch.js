import React from 'react';
import { View, Text, Switch } from 'react-native';

export default function ToggleSwitch({ value, onValueChange, label, color, styles }) {
	return (
		<View style={styles.switchContainer}>
			<Text style={{ color, fontWeight: '600', marginRight: 8 }}>{label}</Text>
			<Switch value={value} onValueChange={onValueChange} thumbColor={value ? '#00e676' : '#607d8b'} trackColor={{ false: '#455a64', true: '#a5d784' }} />
		</View>
	);
}

