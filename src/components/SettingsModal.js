import React from 'react';
import { Modal, View, ScrollView, Text, Pressable, TouchableOpacity } from 'react-native';

export default function SettingsModal({
	visible,
	onClose,
	difficulty,
	onSelectDifficulty,
	focus,
	onSelectFocus,
	theme,
	onSelectTheme,
	currentTheme,
	voice,
	onSelectVoice,
	voices,
	difficulties,
	focuses,
	themes,
	styles,
}) {
	return (
		<Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<ScrollView style={styles.modalScroll} contentContainerStyle={{ paddingBottom: 20 }}>
						<Text style={[styles.modalTitle, { color: theme.primary }]}>Select Difficulty</Text>
						{Object.keys(difficulties).map(key => (
							<Pressable key={key} onPress={() => onSelectDifficulty(key)} style={[styles.modalOption, difficulty === key && styles.modalOptionSelected]}>
								<Text style={styles.modalOptionText}>{difficulties[key].name || key}</Text>
							</Pressable>
						))}

						<Text style={[styles.modalTitle, { color: theme.primary, marginTop: 20 }]}>Select Focus</Text>
						{Object.keys(focuses).map(key => (
							<Pressable key={key} onPress={() => onSelectFocus(key)} style={[styles.modalOption, focus === key && styles.modalOptionSelected]}>
								<Text style={styles.modalOptionText}>{focuses[key].name}</Text>
							</Pressable>
						))}

						<Text style={[styles.modalTitle, { color: theme.primary, marginTop: 20 }]}>Select Theme</Text>
						{themes.map(t => (
							<Pressable key={t} onPress={() => onSelectTheme(t)} style={[styles.modalOption, currentTheme === t && styles.modalOptionSelected]}>
								<Text style={styles.modalOptionText}>{t}</Text>
							</Pressable>
						))}

						<Text style={[styles.modalTitle, { color: theme.primary, marginTop: 20 }]}>Select Voice</Text>
						{voices.map(({ id, name }) => (
							<Pressable key={id} onPress={() => onSelectVoice(id)} style={[styles.modalOption, voice === id && styles.modalOptionSelected]}>
								<Text style={styles.modalOptionText}>{name}</Text>
							</Pressable>
						))}
					</ScrollView>
					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

