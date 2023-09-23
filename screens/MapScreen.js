import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import tw from 'twrnc';
import Map from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptions from '../components/RideOptions';

// Google Places, Google Direction, Google Distance Matrix APIs

const MapScreen = () => {
	const Stack = createNativeStackNavigator();

	return (
		<View>
			<View style={tw`h-1/2`}>
				<Map />
			</View>

			<View style={tw`h-1/2`}>
				<Stack.Navigator>
					<Stack.Screen
						name="NavigateCard"
						component={NavigateCard}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="RideOptions"
						component={RideOptions}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</View>
		</View>
	);
};

export default MapScreen;

const styles = StyleSheet.create({});
