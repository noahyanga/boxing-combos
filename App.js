import React, { useState, useEffect, useCallback, useRef } from "react";
import { SafeAreaView, ScrollView, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Screens
import InstructionsScreen from "./src/screens/InstructionsScreen";
import HomeScreen from "./src/screens/HomeScreen.js";
import MainScreen from "./src/screens/MainScreen.js";

// Import your constants and utils
import colorSchemes from "./src/constants/colorSchemes.js";
import focuses from "./src/constants/focuses.js";
import difficulties from "./src/constants/difficulties.js";
import punchMap from "./src/constants/punchMap.js";
import themeNames from "./src/constants/themeNames.js";
import speechVoices from "./src/constants/speechVoices.js";

import generateCombo from "./src/utils/generateCombo.js";
import speakCombo from "./src/utils/speakCombo.js";
import makeStyles from "./src/styles/makeStyles.js";

export default function App() {
  const { width: windowWidth } = useWindowDimensions();
  const isLargeScreen = windowWidth >= 600;

  // App state
  const [combo, setCombo] = useState("");
  const [playing, setPlaying] = useState(false);
  const [isRound, setIsRound] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");
  const [focus, setFocus] = useState("speed");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("neonGreen");
  const [currentVoice, setCurrentVoice] = useState("default");


  const timerRef = useRef(null);
  const Stack = createNativeStackNavigator();

  // Generates and speaks a new combo
  const playCombo = useCallback(() => {
    // Use default move list if current focus is invalid/undefined
    const moves = (focuses && focuses[focus]) ? focuses[focus].moves : Object.keys(baseWeights);
    const { minLen, maxLen, speechRate } = difficulties[difficulty] || difficulties['medium'];

    const comboArr = generateCombo(moves, minLen, maxLen);
    const comboStr = comboArr.join(' ');
    setCombo(comboStr);
    speakCombo(comboStr, speechRate, currentVoice);
  }, [difficulty, focus, currentVoice]);


  // Timer logic
  useEffect(() => {
    if (!playing) return;

    if (secondsLeft === 0) {
      setSecondsLeft(isRound ? difficulties[difficulty].roundTime : difficulties[difficulty].restTime);
      if (isRound) {
        playCombo();
      } else {
        setCombo("");
      }
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((sec) => {
        if (sec <= 1) {
          clearInterval(timerRef.current);
          setIsRound((prev) => !prev);
          return 0;
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [playing, secondsLeft, isRound, difficulty, playCombo]);

  // Trigger combos every 4s during round
  useEffect(() => {
    if (!playing || !isRound) return;
    const id = setInterval(() => playCombo(), 4000);
    return () => clearInterval(id);
  }, [playing, isRound, difficulty, focus, playCombo]);

  // Format combo for display
  const displayItems = combo ? combo.split(" ").map((m) => (useNumbers && punchMap[m] ? punchMap[m] : m.replace(/_/g, " "))) : [];

  // Play/pause toggle handler
  const togglePlay = () => {
    if (playing) {
      speechCancel();
      setPlaying(false);
    } else {
      setPlaying(true);
      setIsRound(true);
      setSecondsLeft(difficulties[difficulty].roundTime);
      playCombo();
    }
  };

  const styles = makeStyles(colorSchemes[currentTheme], isLargeScreen);

  // Cancel speech helper
  const speechCancel = () => {
    try {
      // Wrap in try/catch since Speech API can error in some states
      Speech.cancel();
    } catch { }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={colorSchemes[currentTheme].background} style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Home Screen */}
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} styles={styles} theme={colorSchemes[currentTheme]} />}
            </Stack.Screen>

            {/* Main Training Screen */}
            <Stack.Screen name="Main">
              {(props) => (
                <MainScreen
                  {...props}
                  styles={styles}
                  theme={colorSchemes[currentTheme]}
                  currentTheme={currentTheme}
                  setCurrentTheme={setCurrentTheme}
                  difficulties={difficulties}
                  focuses={focuses}
                  speechVoices={speechVoices}
                  themeNames={themeNames}
                />
              )}
            </Stack.Screen>

            {/* Instructions Screen */}
            <Stack.Screen name="Instructions">
              {(props) => <InstructionsScreen {...props} styles={styles} theme={colorSchemes[currentTheme]} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </SafeAreaView>
  );

}

