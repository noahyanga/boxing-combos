import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

import StatusDisplay from '../components/StatusDisplay';
import ComboBadge from '../components/ComboBadge';
import Controls from '../components/Controls';
import ToggleSwitch from '../components/ToggleSwitch';
import SettingsModal from '../components/SettingsModal';
import punchMap from '../constants/punchMap';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import generateCombo from '../utils/generateCombo';
import speakCombo from '../utils/speakCombo';

export default function MainScreen({
	handleNavigate,
	styles,
	theme,
	difficulties,
	focuses,
	speechVoices,
	themeNames,
	currentTheme,
	setCurrentTheme,
}) {
	const [combo, setCombo] = useState('');
	const [playing, setPlaying] = useState(false);
	const [isRound, setIsRound] = useState(true);
	const [secondsLeft, setSecondsLeft] = useState(0);
	const [difficulty, setDifficulty] = useState('medium');
	const [focus, setFocus] = useState('none');
	const [settingsVisible, setSettingsVisible] = useState(false);
	const [useNumbers, setUseNumbers] = useState(false);
	const [currentVoice, setCurrentVoice] = useState('default');


	const playCombo = useCallback(() => {
		const { minLen, maxLen, speechRate } = difficulties[difficulty] || difficulties.medium;
		const moves = focuses[focus]?.moves || Object.keys(focuses.none.moves);
		const comboArr = generateCombo(moves, minLen, maxLen);
		const comboStr = comboArr.join(' ');
		setCombo(comboStr);
		speakCombo(comboStr, speechRate, currentVoice);
	}, [difficulty, focus, currentVoice]);

	useEffect(() => {
		if (!playing) return;

		if (secondsLeft === 0) {
			setSecondsLeft(isRound ? difficulties[difficulty].roundTime : difficulties[difficulty].restTime);
			if (isRound) playCombo();
			else setCombo('');
		}

		const timer = setInterval(() => {
			setSecondsLeft(prev => {
				if (prev <= 1) {
					clearInterval(timer);
					setIsRound(prev => !prev);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [playing, secondsLeft, isRound, difficulty, playCombo]);


	useEffect(() => {
		if (!playing || !isRound) return;
		const id = setInterval(() => playCombo(), 4000);
		return () => clearInterval(id);
	}, [playing, isRound, difficulty, focus, playCombo]);

	const displayItems = combo
		? combo.split(' ').map(word =>
			useNumbers && punchMap[word] ? punchMap[word] : word.replace(/_/g, ' ')
		)
		: [];


	const togglePlay = () => {
		if (playing) {
			Speech.stop();
			setPlaying(false);
		} else {
			setPlaying(true);
			setIsRound(true);
			setSecondsLeft(difficulties[difficulty].roundTime);
			playCombo();
		}
	};

	const nextCombo = () => {
		if (!playing) return;
		speechCancel();
		playCombo();
	};

	const speechCancel = () => {
		try {
			Speech.cancel();
		} catch { }
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusDisplay
				roundInfo={{ isRound, secondsLeft }}
				difficulty={difficulty}
				focus={focus}
				styles={styles}
				theme={theme}
			/>

			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.comboContainer}>
				{displayItems.map((label, idx) => (
					<ComboBadge key={idx} label={label} style={styles.comboBadge} textStyle={styles.comboText} />
				))}
			</ScrollView>

			<Controls
				playing={playing}
				isRound={isRound}
				onTogglePlay={togglePlay}
				onNextCombo={nextCombo}
				onSettings={() => setSettingsVisible(true)}
				styles={styles}
			/>

			<ToggleSwitch
				value={useNumbers}
				onValueChange={setUseNumbers}
				label="Show punches as numbers"
				color={theme.primary}
				styles={styles}
			/>

			<TouchableOpacity
				style={[styles.button, { minWidth: 300, backgroundColor: theme.primary }]}
				onPress={() => handleNavigate('Home')}
				activeOpacity={0.8}
			>
				<Text style={styles.buttonText}>Back to Home</Text>
			</TouchableOpacity>



			<SettingsModal
				visible={settingsVisible}
				onClose={() => setSettingsVisible(false)}
				difficulty={difficulty}
				onSelectDifficulty={setDifficulty}
				focus={focus}
				onSelectFocus={setFocus}
				theme={theme}
				themes={themeNames}
				currentTheme={currentTheme}
				onSelectTheme={setCurrentTheme}
				voices={speechVoices}
				voice={currentVoice}
				onSelectVoice={setCurrentVoice}
				difficulties={difficulties}
				focuses={focuses}
				styles={styles}
			/>
		</SafeAreaView>
	);
}

