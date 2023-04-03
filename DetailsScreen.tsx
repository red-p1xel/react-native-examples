import { Text, View } from "react-native";
import React from "react";
import { styles } from "./App";
import { Button } from "react-native-paper";

const DetailsScreen = ({navigation, route}): JSX.Element => {
	return (
		<View style={styles.container}>
			<Text>Details Screen has parameter `name` {route.params.name}</Text>
			<Button
				mode="contained"
				onPress={() => navigation.navigate('Test', {prop1: 'value1'})}
			>
				Go to test screen
			</Button>
		</View>
	);
};

export default DetailsScreen;
