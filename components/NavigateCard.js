import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavorites from './NavFavorites';

import { GOOGLE_MAPS_API_KEY } from '@env';

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<Text style={tw`text-center py-5 text-xl`}>Good morning, Rumi!</Text>
			<View style={tw`border-t border-gray-200 flex-shrink`}>
				<GooglePlacesAutocomplete
					styles={{
						container: {
							flex: 0,
							zIndex: 1,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					minLength={2}
					nearbyPlacesAPI="GooglePlacesSearch"
					placeholder="Where to?"
					debounce={400} // only after you stop typing after 400ms, it will search
					query={{
						key: GOOGLE_MAPS_API_KEY,
						language: 'en',
					}}
					renderLeftButton={() => (
						<Icon
							style={tw`p-2 w-10`}
							type="antdesign"
							name="search1"
							color="black"
						/>
					)}
					listViewDisplayed={true}
					enabledPoweredByContainer={false}
					onPress={(data, details = null) => {
						dispatch(
							setDestination({
								location: details.geometry.location,
								description: data.description,
							})
						);
						navigation.navigate('RideOptions');
					}}
					fetchDetails={true}
					returnKeyType={'search'}
				/>
			</View>

			<NavFavorites />

			<View
				style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
			>
				<TouchableOpacity
					style={tw`flex flex-row justify-between w-30 px-4 py-3 rounded-full bg-black`}
					onPress={() => navigation.navigate('RideOptions')}
				>
					<Icon name="car" type="font-awesome" color="white" size={30} />
					<Text style={tw`text-white text-center text-xl p-2`}>Rides</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={tw`flex flex-row justify-between w-30 px-4 py-3 rounded-full bg-gray-100`}
				>
					<Icon
						name="fast-food-outline"
						type="ionicon"
						color="black"
						size={30}
					/>
					<Text style={tw`text-center text-xl p-2`}>Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const styles = StyleSheet.create({});
