import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Switch,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
  Dimensions,
} from "react-native";
import * as Speech from "expo-speech";
import { LinearGradient } from "expo-linear-gradient";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

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
};

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

const punchMap = {
  jab: "1",
  cross: "2",
  lead_hook: "3",
  rear_hook: "4",
  lead_uppercut: "5",
  rear_uppercut: "6",
  overhand_left: "7",
  overhand_right: "8",
};

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

const difficulties = {
  easy: { minLen: 2, maxLen: 3, speechRate: 0.8, roundTime: 180, restTime: 60 },
  medium: { minLen: 3, maxLen: 5, speechRate: 1, roundTime: 180, restTime: 60 },
  hard: { minLen: 4, maxLen: 6, speechRate: 1.2, roundTime: 180, restTime: 45 },
};

const colorSchemes = {
  neonGreen: {
    primary: "#00e676",
    background: ["#121212", "#090909"],
    text: "#b9fca1",
    badgeBackground: "rgba(0, 230, 118, 0.12)",
    badgeBorder: "#00e676",
    buttonText: "#002200",
    buttonBackground: "#1de9b6",
    buttonBackgroundActive: "#00c853",
  },
  neonPink: {
    primary: "#ff4081",
    background: ["#1a001a", "#090008"],
    text: "#ff80ab",
    badgeBackground: "rgba(255, 64, 129, 0.15)",
    badgeBorder: "#ff4081",
    buttonText: "#33001a",
    buttonBackground: "#ff80ab",
    buttonBackgroundActive: "#f50057",
  },
  blueCyan: {
    primary: "#00bcd4",
    background: ["#001f26", "#000a11"],
    text: "#b2ebf2",
    badgeBackground: "rgba(0, 188, 212, 0.15)",
    badgeBorder: "#00bcd4",
    buttonText: "#00333d",
    buttonBackground: "#4dd1e1",
    buttonBackgroundActive: "#008ba3",
  },
};

const themeNames = Object.keys(colorSchemes);

const speechVoices = [
  { id: "default", name: "Default" },
  { id: "com.apple.ttsbundle.Samantha-compact", name: "Samantha (iOS)" },
  { id: "com.apple.ttsbundle.Alex-compact", name: "Alex (iOS)" },
];

function weightedChoice(choices, weights) {
  let total = weights.reduce((a, b) => a + b, 0);
  let rnd = Math.random() * total;
  for (let i = 0; i < choices.length; i++) {
    if (rnd < weights[i]) return choices[i];
    rnd -= weights[i];
  }
  return choices[choices.length - 1];
}

function generateCombo(focusMoves, minLen = 2, maxLen = 6) {
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

function speakCombo(text, rate, voice) {
  const spoken = text.split(' ').map(k => speechPhraseMap[k] || k).join(' ');
  Speech.speak(spoken, { rate, voice });
}

const speechPhraseMap = {
  lead_hook: 'leed hook',
  rear_hook: 'rear hook',
  lead_uppercut: 'leed uppercut',
  rear_uppercut: 'rear uppercut',
  overhand_left: 'overhand left',
  overhand_right: 'overhand right',
  double_jab: 'double jab',
  step_left: 'step left',
  step_right: 'step right',
  bodyshot: 'body shot',
  jab_cross: 'jab cross',
  hook_uppercut: 'hook uppercut',
  circle: 'circle',
};

const makeStyles = (theme, isLargeScreen) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.background[0]
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    fontSize: 45,
    fontWeight: '900',
    color: theme.primary,
    textShadowColor: theme.primary,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 3 },
    marginBottom: 40
  },
  statusContainer: {
    marginBottom: 18,
    alignItems: 'center'
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.text
  },
  breakText: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.primary,
    marginVertical: 8
  },
  comboContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    maxWidth: '90%',
    marginBottom: 40
  },
  comboBadge: {
    backgroundColor: theme.badgeBackground,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.badgeBorder,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: theme.primary,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 }
  },
  comboText: {
    color: theme.primary,
    fontWeight: '700',
    fontSize: 25
  },
  controls: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    marginVertical: 6,
    marginHorizontal: 6, // safe default for row layout
    backgroundColor: '#444',
    minWidth: 150,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonPrimary: {
    backgroundColor: theme.buttonBackground,
  },
  buttonPrimaryActive: {
    backgroundColor: theme.buttonBackgroundActive,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    fontSize: 25
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'rgba(0,0,0,0.95)',
    borderRadius: 20,
    padding: 20,
  },
  modalScroll: {
    maxHeight: windowHeight * 0.7,
  },
  modalOption: {
    paddingVertical: 16,
    borderRadius: 16,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: '#444',
    backgroundColor: '#111',
    alignItems: 'center'
  },
  modalOptionSelected: {
    backgroundColor: 'rgba(0,255,0,0.2)',
    borderColor: '#0f0'
  },
  modalOptionText: {
    color: '#b9fca1',
    fontSize: 18,
    fontWeight: '700'
  },
  closeButton: {
    backgroundColor: '#333',
    borderRadius: 25,
    marginTop: 20,
    paddingVertical: 16,
    alignItems: 'center'
  },
  closeButtonText: {
    color: '#0f0',
    fontSize: 18,
    fontWeight: '700',
  },
});


export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth >= 600;

  const [combo, setCombo] = useState('');
  const [playing, setPlaying] = useState(false);
  const [isRound, setIsRound] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [difficulty, setDifficulty] = useState('medium');
  const [focus, setFocus] = useState('none');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('neonGreen');
  const [currentVoice, setCurrentVoice] = useState('default');

  const styles = makeStyles(colorSchemes[currentTheme], isLargeScreen);

  const timerRef = useRef();

  const playCombo = useCallback(() => {
    const { minLen, maxLen, speechRate } = difficulties[difficulty];
    const moves = focuses[focus].moves;
    const comboArray = generateCombo(moves, minLen, maxLen);
    const comboString = comboArray.join(' ');
    setCombo(comboString);
    speakCombo(comboString, speechRate, currentVoice);
  }, [difficulty, focus, currentVoice]);

  useEffect(() => {
    if (!playing) return;

    if (secondsLeft === 0) {
      setSecondsLeft(isRound ? difficulties[difficulty].roundTime : difficulties[difficulty].restTime);
      if (isRound) playCombo();
      else setCombo('');
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRound(prev => !prev);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [playing, secondsLeft, isRound, difficulty, playCombo]);

  useEffect(() => {
    if (!playing || !isRound) return;
    const id = setInterval(() => playCombo(), 4000);
    return () => clearInterval(id);
  }, [playing, isRound, difficulty, focus, playCombo]);

  const displayComboItems = () => {
    if (!combo) return [];
    return combo.split(' ').map(word => useNumbers && punchMap[word] ? punchMap[word] : word.replace(/_/g, ' '));
  };

  const togglePlay = () => {
    if (playing) {
      Speech.stop();
      setPlaying(false);
    } else {
      setPlaying(true);
      setIsRound(true);
      setSecondsLeft(difficulties[difficulty].roundTime);
      playCombo();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={colorSchemes[currentTheme].background} style={styles.container}>
        <Text style={styles.header}>Boxing Combos</Text>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{isRound ? "Round" : "Rest"} — {secondsLeft}s remaining</Text>
          {!isRound && <Text style={[styles.statusText, { fontWeight: "bold", color: theme.primary }]}>Take a Break! 💪</Text>}
          <Text style={styles.statusText}>Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Text>
          <Text style={styles.statusText}>Focus: {focuses[focus].name}</Text>
        </View>


        <View style={styles.comboContainer}>
          {displayComboItems().map((label, idx) => (
            <View key={idx} style={styles.comboBadge}>
              <Text style={styles.comboText}>{label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePlay} style={[styles.button, playing ? styles.buttonPrimaryActive : styles.buttonPrimary]} activeOpacity={0.85} accessibilityLabel="Toggle Start/Stop">
            <Text style={styles.buttonText}>{playing ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { if (playing) { Speech.stop(); playCombo(); } }} disabled={!playing || !isRound} style={[styles.button, { backgroundColor: '#ff9800' }]} activeOpacity={0.7} accessibilityLabel="Next Combo">
            <Text style={[styles.buttonText, { color: '#000' }]} >Next Combo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSettingsVisible(true)} style={[styles.button, { backgroundColor: '#2196f3' }]} activeOpacity={0.85}>
            <Text style={[styles.buttonText]}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={{ color: colorSchemes[currentTheme].primary, fontWeight: '600', marginRight: 8 }}>Show punches as numbers</Text>
          <Switch value={useNumbers} onValueChange={setUseNumbers} thumbColor={useNumbers ? '#00e676' : '#607d8b'} trackColor={{ false: '#455a64', true: '#a5d784' }} accessibilityLabel="Toggle numeric punches" />
        </View>

        <Modal visible={settingsVisible} animationType="slide" transparent onRequestClose={() => setSettingsVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView style={styles.modalScroll} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator>
                <Text style={[styles.modalTitle, { color: colorSchemes[currentTheme].primary }]}>Select Difficulty</Text>
                {Object.keys(difficulties).map(level => (
                  <Pressable key={level} onPress={() => setDifficulty(level)} style={[styles.modalOption, difficulty === level && styles.modalOptionSelected]} accessibilityLabel={`Difficulty ${level}`}>
                    <Text style={styles.modalOptionText}>{level.charAt(0).toUpperCase() + level.slice(1)}</Text>
                  </Pressable>
                ))}

                <Text style={[styles.modalTitle, { color: colorSchemes[currentTheme].primary, marginTop: 20 }]}>Select Focus</Text>
                {Object.keys(focuses).map(f => (
                  <Pressable key={f} onPress={() => setFocus(f)} style={[styles.modalOption, focus === f && styles.modalOptionSelected]} accessibilityLabel={`Focus ${focuses[f].name}`}>
                    <Text style={styles.modalOptionText}>{focuses[f].name}</Text>
                  </Pressable>
                ))}

                <Text style={[styles.modalTitle, { color: colorSchemes[currentTheme].primary, marginTop: 20 }]}>Select Theme</Text>
                {themeNames.map(name => (
                  <Pressable key={name} onPress={() => setCurrentTheme(name)} style={[styles.modalOption, currentTheme === name && styles.modalOptionSelected]} accessibilityLabel={`Theme ${name}`}>
                    <Text style={styles.modalOptionText}>{name}</Text>
                  </Pressable>
                ))}

                <Text style={[styles.modalTitle, { color: colorSchemes[currentTheme].primary, marginTop: 20 }]}>Select Voice</Text>
                {speechVoices.map(({ id, name }) => (
                  <Pressable key={id} onPress={() => setCurrentVoice(id)} style={[styles.modalOption, currentVoice === id && styles.modalOptionSelected]} accessibilityLabel={`Voice ${name}`}>
                    <Text style={styles.modalOptionText}>{name}</Text>
                  </Pressable>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => setSettingsVisible(false)} style={styles.closeButton} accessibilityLabel="Close Settings" activeOpacity={0.7}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}


