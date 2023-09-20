import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { setOrigin, setDestination } from '../slices/navSlice';
import { GOOGLE_MAPS_API_KEY } from '@env';
// import Geolocation from 'react-native-geolocation-service';
/**
 *
 * tailwind css notes:
 * p - padding
 * bg - background
 * h - height
 */

const HomeScreen = () => {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	Geolocation.getCurrentPosition(
	// 		(position) => {
	// 			console.log(position);
	// 		},
	// 		(error) => {
	// 			// See error code charts below.
	// 			console.log(error.code, error.message);
	// 		},
	// 		{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
	// 	);
	// }, []);

	try {
		return (
			<SafeAreaView style={tw`bg-white h-full`}>
				<View style={tw`p-5`}>
					<Image
						style={{
							width: 100,
							height: 100,
							resizeMode: 'contain',
						}}
						source={{ uri: 'https://links.papareact.com/gzs' }}
					/>
					{/* <Text style={[tw`p-10`, styles.text]}>Home Screen</Text> */}
					{/* <View
						// style={tw`pb-2 flex flex-row border`}
						style={{
							borderRadius: 100,
							flexDirection: 'row',
							borderWidth: 5,
							padding: 5,
							paddingBottom: 10,
						}}
					>
						<Icon
							style={tw`p-2 rounded-full bg-black w-10 mt-4`}
							type="antdesign"
							name="search1"
							color="white"
						/> */}
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
						placeholder="Where from?"
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
						onPress={(data, details) => {
							console.log(data);
							// console.log(details.geometry);
							// dispatch(
							// 	setOrigin({
							// 		location: details.geometry.location,
							// 		description: data.description,
							// 	})
							// );
							// dispatch(setDestination(null));
						}}
						returnKeyType={'search'}
					/>
					{/* </View> */}
					<NavOptions />
				</View>
			</SafeAreaView>
		);
	} catch (err) {
		console.log(err);
		return (
			<Text style={[tw`p-10`, styles.text]}>Uh-oh, something went wrong.</Text>
		);
	}
};

export default HomeScreen;

const styles = StyleSheet.create({
	text: {
		color: 'purple',
	},
});
