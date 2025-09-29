import baseWeights from "./baseWeights.js";

const focuses = {
	none: { name: "None", moves: Object.keys(baseWeights) },
	power: {
		name: "Power",
		moves: ["cross", "lead_hook", "rear_hook", "lead_uppercut", "rear_uppercut", "overhand_left", "overhand_right", "hook_uppercut", "bodyshot"],
	},
	speed: {
		name: "Speed",
		moves: ["jab", "slip", "double_jab", "shuffle", "step_left", "step_right", "jab_cross"],
	},
	defense: {
		name: "Defense",
		moves: ["pivot", "pull", "slip", "block", "parry", "duck", "circle"],
	},
	footwork: {
		name: "Footwork",
		moves: ["step_forward", "step_back", "step_left", "step_right", "shuffle", "circle"],
	},
};

export default focuses;
