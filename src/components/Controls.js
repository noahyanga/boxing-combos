import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

export default function Controls({ playing, isRound, onTogglePlay, onNextCombo, onSettings, styles }) {
	return (
		<View style={styles.controls}>
			<TouchableOpacity
				onPress={onTogglePlay}
				style={[styles.button, playing ? styles.buttonPrimaryActive : styles.buttonPrimary]}
				activeOpacity={0.85}
				accessibilityLabel="Toggle Start or Pause"
			>
				<Text style={styles.buttonText}>{playing ? 'Pause' : 'Start'}</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onNextCombo}
				disabled={!playing || !isRound}
				style={[
					styles.button,
					{ backgroundColor: '#ff9800' },
					(!playing || !isRound) && { opacity: 0.5 }
				]}
				activeOpacity={0.7}
				accessibilityLabel="Play Next Combo"
			>
				<Text style={[styles.buttonText, { color: '#000' }]}>Next Combo</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={onSettings}
				style={[styles.button, { backgroundColor: '#2196f3' }]}
				activeOpacity={0.85}
				accessibilityLabel="Open Settings"
			>
				<Text style={styles.buttonText}>Settings</Text>
			</TouchableOpacity>
		</View>
	);
}

