import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import * as Speech from "expo-speech";

import StatusDisplay from "../components/StatusDisplay";
import Controls from "../components/Controls";
import ToggleSwitch from "../components/ToggleSwitch";
import SettingsModal from "../components/SettingsModal";
import punchMap from "../constants/punchMap";
import { Audio } from "expo-av";

import generateCombo from "../utils/generateCombo";
import speakCombo from "../utils/speakCombo";

const { width } = Dimensions.get("window");
const isDesktop = width >= 768;

export default function MainScreen({
  handleNavigate,
  styles,
  theme,
  difficulties,
  focuses,
  speechVoices,
  themeNames,
  currentTheme,
  setCurrentTheme,
}) {
  const [combo, setCombo] = useState("");
  const [playing, setPlaying] = useState(false);
  const [isRound, setIsRound] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");
  const [focus, setFocus] = useState("none");
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [currentVoice, setCurrentVoice] = useState("default");
  const [isBellPlaying, setIsBellPlaying] = useState(false);
  const bellRef = useRef(null);

  useEffect(() => {
    const loadBell = async () => {
      try {
        if (bellRef.current && typeof bellRef.current !== "number") {
          await bellRef.current.unloadAsync();
        }

        const { sound } = await Audio.Sound.createAsync(
          require("../assets/boxing-bell-1.wav")
        );

        if (sound && typeof sound.replayAsync === "function") {
          bellRef.current = sound;
        }
      } catch (e) {
        console.error("Failed to load bell:", e);
      }
    };

    loadBell();

    return () => {
      if (bellRef.current && bellRef.current.unloadAsync) {
        bellRef.current.unloadAsync().catch(console.warn);
      }
    };
  }, []);

  const playBell = useCallback(async () => {
    const sound = bellRef.current;

    setIsBellPlaying(true);
    try {
      await sound.replayAsync();
    } catch (e) {
      console.error("Bell failed:", e);
    } finally {
      setIsBellPlaying(false);
    }
  }, []);

  const playCombo = useCallback(async () => {
    if (isBellPlaying) {
      const waitForBell = () => {
        if (!isBellPlaying) {
          playComboActual();
        } else {
          setTimeout(waitForBell, 100);
        }
      };
      waitForBell();
      return;
    }
    playComboActual();
  }, [isBellPlaying]);

  const playComboActual = useCallback(() => {
    const { minLen, maxLen, speechRate } =
      difficulties[difficulty] || difficulties.medium;
    const moves = focuses[focus]?.moves || Object.keys(focuses.none.moves);

    const comboArr = generateCombo(moves, minLen, maxLen);
    if (!Array.isArray(comboArr) || comboArr.length === 0) return;

    const comboStr = comboArr.join(" ");
    setCombo(comboStr);
  }, [difficulty, focus, currentVoice, difficulties, focuses]);

  useEffect(() => {
    if (!playing) return;

    if (secondsLeft === 0) {
      const nextTime = isRound
        ? difficulties[difficulty].roundTime
        : difficulties[difficulty].restTime;
      setSecondsLeft(nextTime);

      if (isRound) {
        playBell();
      } else {
        setCombo("");
      }
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          playBell();
          setTimeout(() => {
            setIsRound((prevIsRound) => !prevIsRound);
          }, 1200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [playing, secondsLeft, isRound, difficulty, playBell]);

  useEffect(() => {
    if (!playing || !isRound || isBellPlaying) return;
    const id = setInterval(() => playCombo(), 4000);
    return () => clearInterval(id);
  }, [playing, isRound, difficulty, focus, isBellPlaying, playCombo]);

  const displayItems = combo
    ? combo
      .split(" ")
      .map((word) =>
        useNumbers && punchMap[word]
          ? punchMap[word]
          : word.replace(/_/g, " ")
      )
    : [];

  const togglePlay = () => {
    if (playing) {
      Speech.stop();
      setPlaying(false);
    } else {
      setPlaying(true);
      setIsRound(true);
      setSecondsLeft(difficulties[difficulty].roundTime);
        playCombo();
        playBell();
    }
  };

  const nextCombo = () => {
    if (!playing) return;
    try {
      Speech.cancel();
    } catch { }
      playCombo();
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={[styles.safeArea, { paddingHorizontal: 20, paddingVertical: 20, flex: 1 }]}
      >
        <StatusDisplay
          roundInfo={{ isRound, secondsLeft }}
          isBellPlaying={isBellPlaying}
          difficulty={difficulty}
          focus={focus}
          styles={styles}
          theme={theme}
        />

        <View style={[styles.comboContainer, { flex: 1 }]}>
          {displayItems.map((label, idx) => (
            <View key={idx} style={[styles.comboBadge, { borderRadius: 20 }]}>
              <Text style={[styles.comboText, isDesktop && { fontSize: 24 }]}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ marginBottom: 10 }}>
          <Controls
            playing={playing}
            isRound={isRound}
            onTogglePlay={togglePlay}
            onNextCombo={nextCombo}
            onSettings={() => setSettingsVisible(true)}
            styles={styles}
          />
        </View>

          <View style={{ marginTop: 10 }}>
            <ToggleSwitch
              value={useNumbers}
              onValueChange={setUseNumbers}
              label="Show punches as numbers"
              color={theme.primary}
              styles={styles}
            />
          </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.primary, borderRadius: 12, marginTop: 10 },
          ]}
          onPress={() => handleNavigate("Home - Boxing Combo Generator")}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>

        <SettingsModal
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          difficulty={difficulty}
          onSelectDifficulty={setDifficulty}
          focus={focus}
          onSelectFocus={setFocus}
          theme={theme}
          themes={themeNames}
          currentTheme={currentTheme}
          onSelectTheme={setCurrentTheme}
          voices={speechVoices}
          voice={currentVoice}
          onSelectVoice={setCurrentVoice}
          difficulties={difficulties}
          focuses={focuses}
          styles={styles}
        />
      </SafeAreaView>
    </View>
  );
}