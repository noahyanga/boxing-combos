const validMoves = {
	jab: [
		"cross",
		"lead_hook",
		"rear_hook",        // add
		"lead_uppercut",    // add
		"rear_uppercut",    // add
		"slip",
		"pivot",
		"pull",
		"jab",
		"double_jab",
		"jab_cross"
	],

	double_jab: [
		"cross",
		"lead_hook",
		"rear_hook",        // add
		"lead_uppercut",    // add
		"rear_uppercut",    // add
		"slip",
		"pivot",
		"pull",
		"jab",
		"jab_cross"
	],

	cross: [
		"lead_hook",
		"rear_hook",        // add
		"lead_uppercut",
		"rear_uppercut",    // add
		"slip",
		"pivot",
		"pull",
		"overhand_left",
		"bodyshot",
		"duck",             // add
		"parry",            // add
		"jab_cross"
	],

	jab_cross: [
		"lead_hook",
		"rear_hook",        // add
		"lead_uppercut",
		"rear_uppercut",    // add
		"slip",
		"pivot",
		"pull",
		"overhand_left",
		"bodyshot",
		"duck",             // add
		"parry",            // add
	],



	lead_hook: [
		"lead_uppercut",
		"cross",            // add (3–2)
		"jab",
		"slip",
		"pivot",
		"pull",
		"hook_uppercut",
		"bodyshot",
		"duck",             // add
		"parry"             // add
	],

	rear_hook: [
		"lead_uppercut",
		"cross",            // add
		"jab",
		"slip",
		"pivot"             // add
	],

	lead_uppercut: [
		"jab",
		"cross",            // add (5–2)
		"slip",
		"pivot",
		"pull",
		"rear_hook",
		"hook_uppercut"
	],

	rear_uppercut: [
		"jab",
		"cross",            // add (6–2)
		"slip",
		"pivot",
		"pull",
		"lead_hook",
		"hook_uppercut"
	],

	slip: [
		"jab",
		"cross",
		"lead_hook",
		"pivot",
		"pull",
		"duck",
		"parry",
		"block"
	],

	pivot: [
		"jab",
		"cross",
		"step_forward",
		"step_back",
		"step_left",
		"step_right"
	],

	pull: [
		"jab",
		"cross",
		"step_back",
		"circle"
	],

	overhand_left: [
		"jab",
		"lead_hook",
		"lead_uppercut",
		"bodyshot",
		"slip",             // add
		"duck",             // add
		"pivot"             // add
	],

	overhand_right: [
		"jab",
		"rear_hook",
		"rear_uppercut",
		"bodyshot",
		"slip",             // add
		"duck",             // add
		"pivot"             // add
	],

	bodyshot: [
		"slip",
		"duck",
		"pivot",
		"step_back",        // add
		"circle"            // add
	],

	double_jab: [
		"cross",
		"lead_hook",
		"slip",
		"jab_cross"
	],

	duck: [
		"jab",
		"cross",
		"lead_uppercut",
		"pivot"
	],

	parry: [
		"jab",
		"cross",
		"lead_hook"
	],

	block: [
		"jab",
		"cross",
		"lead_hook",
		"slip"
	],

	step_forward: [
		"jab",
		"cross",
		"lead_hook",
		"shuffle",          // add
		"circle"            // add
	],

	step_back: [
		"slip",
		"pivot",
		"pull",
		"shuffle",          // add
		"circle"            // add
	],

	step_left: [
		"jab",
		"cross",
		"slip",
		"shuffle"           // add
	],

	step_right: [
		"jab",
		"cross",
		"slip",
		"shuffle"           // add
	],

	shuffle: [
		"jab",
		"cross",
		"lead_hook",
		"step_forward",     // add
		"step_back"         // add
	],

	circle: [
		"jab",
		"cross",
		"slip",
		"pivot",            // add
		"circle"            // add
	]
};

export default validMoves;

