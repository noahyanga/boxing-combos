const baseWeights = {
  jab: 5,
  cross: 4,
  lead_hook: 3,
  rear_hook: 3,
  lead_uppercut: 2,
  rear_uppercut: 2,
  slip: 3,
  pivot: 2,
  pull: 2,
  overhand_left: 2,
  overhand_right: 2,
  bodyshot: 2,
  double_jab: 3,
  duck: 2,
  parry: 2,
  block: 2,
  step_forward: 2,
  step_back: 2,
  step_left: 3,
  step_right: 3,
  shuffle: 3,
  circle: 2,
  jab_cross: 3,
  hook_uppercut: 2,

  // Feints
  jab_feint: 2,
  cross_feint: 2,
  lead_hook_feint: 2,
  rear_hook_feint: 2,
  lead_uppercut_feint: 1,
  rear_uppercut_feint: 1,

  // Body shots
  lead_body_hook: 3,
  rear_body_hook: 3,
  lead_body_shot: 2,
  rear_body_shot: 2,

  // Defensive/Counter moves
  roll: 2,
  slip_counter: 2,
  pull_counter: 2,
  pivot_counter: 2,
  check_hook: 2,
  shovel_hook: 1,
};

export default baseWeights;
