import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { styles } from "./App";

const HomeScreen = ({ navigation }): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text>Home Screen</Text>
			<Button
				mode="contained"
				onPress={() => navigation.navigate('Details', {name: 'Param'})}
			>
				Go to details
			</Button>
		</View>
	);
};

export default HomeScreen;
