import baseWeights from "./baseWeights.js";

const focuses = {
	none: {
		name: "None",
		moves: Object.keys(baseWeights),
	},

	power: {
		name: "Power",
		moves: [
			"cross",
			"lead_hook",
			"rear_hook",
			"lead_uppercut",
			"rear_uppercut",
			"overhand_left",
			"overhand_right",
			"hook_uppercut",
			"bodyshot"
		],
	},

	speed: {
		name: "Speed",
		moves: [
			"jab",
			"double_jab",
			"jab_cross",     // fast straight combo work
			"slip",          // quick head movement
			"shuffle",
			"step_left",
			"step_right"
		],
	},

	defense: {
		name: "Defense",
		moves: [
			"slip",
			"duck",
			"pull",
			"parry",
			"block",
			"pivot",
			"circle"
		],
	},

	footwork: {
		name: "Footwork",
		moves: [
			"step_forward",
			"step_back",
			"step_left",
			"step_right",
			"shuffle",
			"circle"
		],
	},

	// optional extras:
	counter: {
		name: "Counter",
		moves: [
			"slip",
			"pull",
			"parry",
			"pivot",
			"jab",
			"cross",
			"lead_hook"
		],
	},

	cardio: {
		name: "Cardio",
		moves: [
			"jab",
			"double_jab",
			"jab_cross",
			"shuffle",
			"step_forward",
			"step_back",
			"circle"
		],
	},
};



export default focuses;
