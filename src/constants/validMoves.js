const validMoves = {
	jab: ["cross", "lead_hook", "slip", "pivot", "pull", "jab", "double_jab", "jab_cross"],
	cross: ["lead_hook", "lead_uppercut", "slip", "pivot", "pull", "overhand_left", "bodyshot", "jab_cross"],
	lead_hook: ["lead_uppercut", "jab", "slip", "pivot", "pull", "hook_uppercut", "bodyshot"],
	rear_hook: ["lead_uppercut", "jab", "slip"],
	lead_uppercut: ["jab", "slip", "pivot", "pull", "rear_hook", "hook_uppercut"],
	rear_uppercut: ["jab", "slip", "pivot", "pull", "lead_hook", "hook_uppercut"],
	slip: ["jab", "cross", "lead_hook", "pivot", "pull", "duck", "parry", "block"],
	pivot: ["jab", "cross", "step_forward", "step_back", "step_left", "step_right"],
	pull: ["jab", "cross", "step_back", "circle"],
	overhand_left: ["jab", "lead_hook", "lead_uppercut", "bodyshot"],
	overhand_right: ["jab", "rear_hook", "rear_uppercut", "bodyshot"],
	bodyshot: ["slip", "duck", "pivot"],
	double_jab: ["cross", "lead_hook", "slip", "jab_cross"],
	duck: ["jab", "cross", "lead_uppercut", "pivot"],
	parry: ["jab", "cross", "lead_hook"],
	block: ["jab", "cross", "lead_hook", "slip"],
	step_forward: ["jab", "cross", "lead_hook"],
	step_back: ["slip", "pivot", "pull"],
	step_left: ["jab", "cross", "slip"],
	step_right: ["jab", "cross", "slip"],
	shuffle: ["jab", "cross", "lead_hook"],
	circle: ["jab", "cross", "slip"],
	jab_cross: ["lead_hook", "lead_uppercut", "slip", "pivot"],
	hook_uppercut: ["jab", "slip", "pivot"],
};

export default validMoves;

