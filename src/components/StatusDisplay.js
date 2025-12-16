import React from 'react';
import { View, Text } from 'react-native';

export default function StatusDisplay({ roundInfo, difficulty, focus, styles }) {
	const { isRound, secondsLeft } = roundInfo;

	return (
		<View style={styles.statusContainer}>
			<Text style={styles.statusText}>
				{isRound ? 'Round' : 'Rest'} — {secondsLeft}s remaining
			</Text>
			<Text style={styles.statusText}>Difficulty: {difficulty}</Text>
			<Text style={styles.statusText}>Focus: {focus}</Text>

			{!isRound && (
				<Text style={[styles.statusText, { padding: 50, fontSize: 100, fontWeight: 'bold', color: styles.header.color }]}>
					Take a Break! 💪
				</Text>
			)}
		</View>
	);
}

