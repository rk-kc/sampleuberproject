import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
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
				<View>
					<GooglePlacesAutocomplete
						styles={{
							container: {
								flex: 0,
							},
							textInput: {
								fontSize: 18,
							},
						}}
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
							console.log(details.geometry);
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
			</View>
			<View>
				<NavFavorites />
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const styles = StyleSheet.create({});
