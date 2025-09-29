import * as Speech from 'expo-speech';
import { speechPhraseMap } from '../constants/speechPhraseMap.js';

export default function speakCombo(text, rate, voice) {
	if (typeof text !== 'string' || text.length === 0) {
		// Nothing to say or invalid input
		return;
	}

	const spoken = text
		.split(' ')
		.map(k => speechPhraseMap[k] || k)
		.join(' ');

	Speech.speak(spoken, { rate, voice });
}

