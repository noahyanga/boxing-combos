import weightedChoice from './weightedChoice.js';
import baseWeights from '../constants/baseWeights.js';
import validMoves from '../constants/validMoves.js';

export default function generateCombo(focusMoves, minLen = 2, maxLen = 6) {
	const moves = focusMoves.length ? focusMoves : Object.keys(baseWeights);
	const weights = moves.map(m => baseWeights[m] || 1);
	let current = weightedChoice(moves, weights);
	let combo = [current];

	while (combo.length < maxLen) {
		const nextMoves = (validMoves[current] || []).filter(m => moves.includes(m));
		if (nextMoves.length === 0) break;
		const weights = nextMoves.map(m => baseWeights[m] || 1);
		const next = weightedChoice(nextMoves, weights);
		combo.push(next);
		current = next;
		if (combo.length >= minLen && Math.random() > 0.7) break;
	}
	return combo;
}
