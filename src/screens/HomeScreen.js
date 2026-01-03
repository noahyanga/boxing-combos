import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const gloveImage = require("../assets/boxing_gloves.png");
export default function HomeScreen({ handleNavigate, styles, theme }) {
  const navigation = useNavigation();

  // Animation refs
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    // Bounce animation
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    // Rotation animation
    const rotateAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(rotateAnim, {
          toValue: 0.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: -0.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Glow animation
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.8,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );

    bounceAnimation.start();
    rotateAnimation.start();
    glowAnimation.start();

    return () => {
      bounceAnimation.stop();
      rotateAnimation.stop();
      glowAnimation.stop();
    };
  }, [bounceAnim, rotateAnim, glowAnim]);

  return (
    <LinearGradient
      colors={theme.gradient || [theme.primary, theme.secondary]}
      style={styles.container}
    >
      <Animated.View
        style={{
          alignSelf: "center",
          marginVertical: 24,
          transform: [
            { scale: bounceAnim },
            {
              rotate: rotateAnim.interpolate({
                inputRange: [-1, 1],
                outputRange: ["-5deg", "5deg"],
              }),
            },
          ],
        }}
      >
        <Animated.Image
          source={gloveImage}
          style={{
            width: 120,
            height: 120,
            shadowColor: theme.secondary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: glowAnim,
            shadowRadius: 15,
            elevation: 8,
          }}
        />
      </Animated.View>

      <Text
        style={[
          styles.header,
          {
            fontWeight: "bold",
            fontSize: 50,
            textShadowColor: "#000",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          },
        ]}
      >
        Boxing Combo Generator
      </Text>

      <Text
        style={[
          styles.statusText,
          { marginBottom: 30, fontStyle: "italic", color: theme.primary },
        ]}
      >
        Train smart, improve faster, and master your combos.
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          { minWidth: 200, backgroundColor: theme.primary, elevation: 4 },
        ]}
        onPress={() => handleNavigate("Main - Boxing Combo Generator")}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Start Training</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            minWidth: 200,
            marginTop: 20,
            backgroundColor: theme.buttonBackground,
            elevation: 2,
          },
        ]}
        onPress={() =>
          navigation.navigate("Instructions - Boxing Combo Generator")
        }
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Instructions / Info</Text>
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 40,
          color: theme.primary,
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        "Champions are made, not born!"
      </Text>
    </LinearGradient>
  );
}
