import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import tw from 'twrnc';
import { setDestination } from '../slices/navSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const data = [
	{
		id: '123',
		icon: 'home',
		locationName: 'Home',
		description:
			'Tokyo Station, 1 Chome-9 Marunouchi, Chiyoda City, Tokyo, Japan',
		location: {
			lat: 35.68123620000001,
			lng: 139.7671248,
		},
	},
	// {
	// 	id: '456',
	// 	icon: 'briefcase',
	// 	locationName: 'Work',
	// 	description: 'Meguro Station',
	// 	location: {
	// 		lat: 35.6761919,
	// 		lng: 139.6503106,
	// 	},
	// },
];

const NavFavorites = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const origin = useSelector(selectOrigin);

	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => (
				<View style={[tw`bg-gray-200`, { height: 0.5 }]} />
			)}
			renderItem={({ item }) => (
				<TouchableOpacity
					style={tw`flex-row items-center p-5`}
					onPress={() => {
						dispatch(
							setDestination({
								location: item.location,
								description: item.description,
							})
						);
						// navigation.navigate('MapScreen');
					}}
					disabled={!origin}
				>
					<Icon
						style={tw`p-3 bg-gray-300 rounded-full mr-4`}
						type="ionicon"
						name={item.icon}
						color="white"
					/>
					<View>
						<Text style={tw`text-lg font-semibold`}>{item.locationName}</Text>
						<Text style={tw`text-gray-500`}>{item.description}</Text>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavFavorites;

const styles = StyleSheet.create({});
