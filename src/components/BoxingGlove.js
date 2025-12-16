import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Dimensions, View } from 'react-native';

const gloveImage = require('../assets/boxing_gloves.png');

export default function BoxingScene({ triggerAnimation, onAnimationEnd }) {
	const [showBg, setShowBg] = useState(false);

	// Animated background color value
	const colorAnim = useRef(new Animated.Value(0)).current;

	// Glove animation values
	const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
	const opacityAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(1)).current;
	const rotateAnim = useRef(new Animated.Value(0)).current;

	const gloveWidth = 250;
	const screenWidth = Dimensions.get('window').width;
	const centerX = (screenWidth - gloveWidth) / 2;

	useEffect(() => {
		if (triggerAnimation) {
			setShowBg(true);
			colorAnim.setValue(0);

			// Loop color background animation while visible (slow color transition)
			Animated.loop(
				Animated.sequence([
					Animated.timing(colorAnim, {
						toValue: 1,
						duration: 2000,       // slower fade to blue
						useNativeDriver: false,
					}),
					Animated.timing(colorAnim, {
						toValue: 0,
						duration: 2000,       // slower fade back to red
						useNativeDriver: false,
					}),
				])
			).start();

			// Initialize glove animation values
			scaleAnim.setValue(1);
			rotateAnim.setValue(0);
			slideAnim.setValue(-screenWidth);
			opacityAnim.setValue(0);

			Animated.sequence([
				Animated.parallel([
					Animated.timing(slideAnim, {
						toValue: centerX,
						duration: 800,           // slower slide-in for smoother effect
						easing: Easing.out(Easing.cubic),
						useNativeDriver: true,
					}),
					Animated.timing(opacityAnim, {
						toValue: 1,
						duration: 600,           // fade in glove slightly slower
						useNativeDriver: true,
					}),
					Animated.timing(scaleAnim, {
						toValue: 1.3,
						duration: 800,           // smooth scale up larger
						useNativeDriver: true,
					}),
					Animated.timing(rotateAnim, {
						toValue: 15,
						duration: 800,           // coordinated rotate with scale & slide
						useNativeDriver: true,
					}),
				]),
				Animated.delay(150),           // slight pause at peak

				Animated.parallel([
					Animated.timing(scaleAnim, {
						toValue: 1,
						duration: 250,           // smooth scale back to normal
						useNativeDriver: true,
					}),
					Animated.timing(rotateAnim, {
						toValue: 0,
						duration: 250,           // simultaneously straighten glove
						useNativeDriver: true,
					}),
				]),
				Animated.delay(500),           // hold position for better pacing


				Animated.parallel([
					Animated.timing(slideAnim, {
						toValue: centerX,
						duration: 600,           // gentle slide-out off screen
						easing: Easing.in(Easing.cubic),
						useNativeDriver: true,
					}),
					Animated.timing(opacityAnim, {
						toValue: 0,
						duration: 400,           // fade out glove smoothly
						useNativeDriver: true,
					}),
				]),
			]).start(() => {
				colorAnim.stopAnimation();
				setShowBg(false);

				if (onAnimationEnd) onAnimationEnd();
			});
		}
	}, [triggerAnimation]);


	// Interpolated background color animation
	const backgroundColor = colorAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['red', 'yellow']
	});

	const animatedBgStyle = {
		...StyleSheet.absoluteFillObject,
		backgroundColor, // animated interpolated color
		opacity: 0.4,    // you can adjust opacity here
		zIndex: 0,
		pointerEvents: 'none', // don't block touches
	};

	return (
		<View style={styles.container}>
			{showBg && (
				<Animated.View style={animatedBgStyle}
				/>
			)}

			{triggerAnimation && (
				<Animated.View
					style={[
						styles.gloveContainer,
						{
							opacity: opacityAnim,
							transform: [
								{ translateX: slideAnim },
								{ scale: scaleAnim },
								{
									rotate: rotateAnim.interpolate({
										inputRange: [0, 25],
										outputRange: ['0deg', '25deg'],
									}),
								},
							],
						},
					]}
					pointerEvents="none"
				>
					<Image source={gloveImage} style={styles.glove} />
				</Animated.View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 0,
		pointerEvents: 'none',
	},
	background: {
		...StyleSheet.absoluteFillObject,
	},

	gloveContainer: {
		top: 100,           // adjust as needed
		width: 250,
		height: 250,
		zIndex: 1,
		alignItems: 'center',
		justifyContent: 'center',

	},
	glove: {
		width: 250,
		height: 250,
	},
});

