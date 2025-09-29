
export default function weightedChoice(choices, weights) {
	let total = weights.reduce((a, b) => a + b, 0);
	let rnd = Math.random() * total;
	for (let i = 0; i < choices.length; i++) {
		if (rnd < weights[i]) return choices[i];
		rnd -= weights[i];
	}
	return choices[choices.length - 1];
}

