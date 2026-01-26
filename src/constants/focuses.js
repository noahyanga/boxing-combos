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
      "bodyshot",
      "lead_body_hook",
      "rear_body_hook",
      "lead_body_shot",
      "rear_body_shot",
      "shovel_hook",
    ],
  },

  speed: {
    name: "Speed",
    moves: [
      "jab",
      "double_jab",
      "jab_cross", // fast straight combo work
      "slip", // quick head movement
      "shuffle",
      "step_left",
      "step_right",
      "jab_feint",
      "cross_feint",
      "check_hook",
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
      "circle",
      "roll",
      "slip_counter",
      "pull_counter",
      "pivot_counter",
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
      "circle",
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
      "lead_hook",
      "slip_counter",
      "pull_counter",
      "pivot_counter",
      "check_hook",
      "roll",
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
      "circle",
    ],
  },

  feints: {
    name: "Feints",
    moves: [
      "jab_feint",
      "cross_feint",
      "lead_hook_feint",
      "rear_hook_feint",
      "lead_uppercut_feint",
      "rear_uppercut_feint",
      "jab",
      "cross",
      "lead_hook",
      "rear_hook",
    ],
  },

  body_work: {
    name: "Body Work",
    moves: [
      "lead_body_hook",
      "rear_body_hook",
      "lead_body_shot",
      "rear_body_shot",
      "bodyshot",
      "shovel_hook",
      "lead_uppercut",
      "rear_uppercut",
    ],
  },
};

export default focuses;
