import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// [Step 1] Setup Redux [DONE]
// Have something called a provider from redux - I am not sure what Provider is for now. I will just use it. LOL
// Redux is a data layer within the app. Which surrounds my entire app.
// When you add Provider, it will throw an error because it needs a store. So we need to create a store.
// [Step 2] Create a screens folder and have all the screens there
// [Step 3] Create a HomeScreen file

import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<Provider store={store}>
			<NavigationContainer>
				<SafeAreaProvider>
					<Stack.Navigator>
						<Stack.Screen
							name="HomeScreen"
							component={HomeScreen}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="MapScreen"
							component={MapScreen}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
