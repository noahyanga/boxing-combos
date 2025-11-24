import { StyleSheet, Dimensions } from 'react-native';

const { height: windowHeight } = Dimensions.get('window');


const makeStyles = (theme, isLargeScreen) => StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: theme.background[0]
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: theme.background[0]
	},
	header: {
		fontSize: 35,
		fontWeight: '900',
		color: theme.primary,
		marginBottom: 40,
		textAlign: 'center'
	},
	statusContainer: {
		marginBottom: 18,
		alignItems: 'center'
	},
	statusText: {
		fontSize: 30,
		fontWeight: '600',
		padding: 5,
		color: theme.text,
		textAlign: 'center',
	},
	breakText: {
		fontSize: 22,
		fontWeight: '700',
		color: theme.primary,
		marginVertical: 8
	},
	comboContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: 15,
		maxWidth: '100%',
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
		flex: 1,
		alignItems: 'center',
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

export default makeStyles;
