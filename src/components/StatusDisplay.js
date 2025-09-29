import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function StatusDisplay({ roundInfo, difficulty, focus, styles }) {
	const { isRound, secondsLeft } = roundInfo;

	return (
		<View style={styles.statusContainer}>
			<Text style={styles.statusText}>
				{isRound ? 'Round' : 'Rest'} — {secondsLeft}s remaining
			</Text>
			{!isRound && (
				<Text style={[styles.statusText, { fontWeight: 'bold', color: styles.header.color }]}>
					Take a Break! 💪
				</Text>
			)}
			<Text style={styles.statusText}>Difficulty: {difficulty}</Text>
			<Text style={styles.statusText}>Focus: {focus}</Text>
		</View>
	);
}

