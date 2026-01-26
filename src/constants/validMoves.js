const validMoves = {
  jab: [
    "cross",
    "lead_hook",
    "rear_hook", // add
    "lead_uppercut", // add
    "rear_uppercut", // add
    "slip",
    "pivot",
    "pull",
    "jab",
    "double_jab",
    "jab_cross",
    "jab_feint",
    "roll",
  ],

  double_jab: [
    "cross",
    "lead_hook",
    "rear_hook", // add
    "lead_uppercut", // add
    "rear_uppercut", // add
    "slip",
    "pivot",
    "pull",
    "jab",
    "jab_cross",
    "jab_feint",
  ],

  cross: [
    "lead_hook",
    "rear_hook", // add
    "lead_uppercut",
    "rear_uppercut", // add
    "slip",
    "pivot",
    "pull",
    "overhand_left",
    "bodyshot",
    "duck", // add
    "parry", // add
    "jab_cross",
    "cross_feint",
    "roll",
  ],

  jab_cross: [
    "lead_hook",
    "rear_hook", // add
    "lead_uppercut",
    "rear_uppercut", // add
    "slip",
    "pivot",
    "pull",
    "overhand_left",
    "bodyshot",
    "duck", // add
    "parry", // add
    "roll",
  ],

  lead_hook: [
    "lead_uppercut",
    "cross", // add (3–2)
    "jab",
    "slip",
    "pivot",
    "pull",
    "hook_uppercut",
    "bodyshot",
    "duck", // add
    "parry", // add
    "lead_hook_feint",
    "lead_body_hook",
    "roll",
  ],

  rear_hook: [
    "lead_uppercut",
    "cross", // add
    "jab",
    "slip",
    "pivot", // add
    "rear_hook_feint",
    "rear_body_hook",
    "roll",
  ],

  lead_uppercut: [
    "jab",
    "cross", // add (5–2)
    "slip",
    "pivot",
    "pull",
    "rear_hook",
    "hook_uppercut",
    "lead_uppercut_feint",
    "roll",
  ],

  rear_uppercut: [
    "jab",
    "cross", // add (6–2)
    "slip",
    "pivot",
    "pull",
    "lead_hook",
    "hook_uppercut",
    "rear_uppercut_feint",
    "roll",
  ],

  slip: [
    "jab",
    "cross",
    "lead_hook",
    "pivot",
    "pull",
    "duck",
    "parry",
    "block",
    "roll",
    "slip_counter",
  ],

  pivot: [
    "jab",
    "cross",
    "step_forward",
    "step_back",
    "step_left",
    "step_right",
    "roll",
    "pivot_counter",
  ],

  pull: ["jab", "cross", "step_back", "circle", "pull_counter", "roll"],

  overhand_left: [
    "jab",
    "lead_hook",
    "lead_uppercut",
    "bodyshot",
    "slip", // add
    "duck", // add
    "pivot", // add
  ],

  overhand_right: [
    "jab",
    "rear_hook",
    "rear_uppercut",
    "bodyshot",
    "slip", // add
    "duck", // add
    "pivot", // add
  ],

  bodyshot: [
    "slip",
    "duck",
    "pivot",
    "step_back", // add
    "circle", // add
  ],

  double_jab: ["cross", "lead_hook", "slip", "jab_cross"],

  duck: ["jab", "cross", "lead_uppercut", "pivot"],

  parry: ["jab", "cross", "lead_hook"],

  block: ["jab", "cross", "lead_hook", "slip"],

  step_forward: [
    "jab",
    "cross",
    "lead_hook",
    "shuffle", // add
    "circle", // add
  ],

  step_back: [
    "slip",
    "pivot",
    "pull",
    "shuffle", // add
    "circle", // add
  ],

  step_left: [
    "jab",
    "cross",
    "slip",
    "shuffle", // add
  ],

  step_right: [
    "jab",
    "cross",
    "slip",
    "shuffle", // add
  ],

  shuffle: [
    "jab",
    "cross",
    "lead_hook",
    "step_forward", // add
    "step_back", // add
  ],

  circle: [
    "jab",
    "cross",
    "slip",
    "pivot", // add
    "circle", // add
  ],

  // Feints
  jab_feint: [
    "cross",
    "lead_hook",
    "lead_uppercut",
    "rear_hook",
    "rear_uppercut",
    "jab",
  ],

  cross_feint: ["jab", "lead_hook", "lead_uppercut", "cross"],

  lead_hook_feint: ["jab", "cross", "lead_uppercut", "rear_hook", "lead_hook"],

  rear_hook_feint: ["jab", "cross", "rear_uppercut", "lead_hook", "rear_hook"],

  lead_uppercut_feint: [
    "jab",
    "cross",
    "lead_hook",
    "rear_hook",
    "lead_uppercut",
  ],

  rear_uppercut_feint: [
    "jab",
    "cross",
    "lead_hook",
    "rear_hook",
    "rear_uppercut",
  ],

  // Body shots
  lead_body_hook: [
    "lead_uppercut",
    "rear_hook",
    "slip",
    "duck",
    "pivot",
    "step_back",
  ],

  rear_body_hook: [
    "lead_hook",
    "lead_uppercut",
    "slip",
    "duck",
    "pivot",
    "step_back",
  ],

  lead_body_shot: ["lead_uppercut", "cross", "slip", "duck", "pivot"],

  rear_body_shot: ["lead_hook", "jab", "slip", "duck", "pivot"],

  // Defensive moves
  roll: [
    "jab",
    "cross",
    "lead_hook",
    "rear_hook",
    "lead_uppercut",
    "rear_uppercut",
    "slip",
    "duck",
  ],

  slip_counter: [
    "cross",
    "lead_hook",
    "rear_hook",
    "lead_uppercut",
    "rear_uppercut",
  ],

  pull_counter: [
    "jab",
    "cross",
    "lead_hook",
    "overhand_left",
    "overhand_right",
  ],

  pivot_counter: ["lead_hook", "rear_hook", "lead_uppercut", "overhand_left"],

  // Advanced combinations
  hook_uppercut: ["cross", "rear_hook", "slip", "pivot", "duck"],

  check_hook: ["jab", "cross", "slip", "pivot", "step_back"],

  shovel_hook: ["lead_uppercut", "rear_uppercut", "slip", "duck", "pivot"],
};

export default validMoves;
