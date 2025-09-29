import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function Controls({ playing, isRound, onTogglePlay, onNextCombo, onSettings, styles }) {
	return (
		<View style={styles.controls}>
			<TouchableOpacity
				onPress={onTogglePlay}
				style={[styles.button, playing ? styles.buttonActive : styles.button]}
			>
				<Text style={styles.buttonText}>{playing ? 'Pause' : 'Start'}</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onNextCombo}
				disabled={!playing || !isRound}
				style={[styles.button, { backgroundColor: '#ff9800' }]}
			>
				<Text style={[styles.buttonText, { color: '#000' }]}>Next Combo</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={onSettings} style={[styles.button, { backgroundColor: '#2196f3' }]}>
				<Text style={styles.buttonText}>Settings</Text>
			</TouchableOpacity>
		</View>
	);
}

