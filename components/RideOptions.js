import {
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	FlatList,
	Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import React, { useState } from 'react';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
	{
		id: 'Uber-X-123',
		title: 'Uber X',
		multiplier: 1,
		image: 'https://links.papareact.com/3pn',
	},
	{
		id: 'Uber-XL-456',
		title: 'Uber XL',
		multiplier: 1.2,
		image: 'https://links.papareact.com/5w8',
	},
	{
		id: 'Uber-LUX-123',
		title: 'Uber LUX',
		multiplier: 1.75,
		image: 'https://links.papareact.com/7pf',
	},
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptions = () => {
	const navigation = useNavigation();
	const travelTimeInformation = useSelector(selectTravelTimeInformation);
	const [selected, setSelected] = useState(null);

	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View style={tw`flex-row`}>
				<TouchableOpacity
					onPress={() => navigation.navigate('NavigateCard')} // onPress does not work when style is set to absolute.
					style={tw`top-3 left-5 p-3 relative rounded-full`}
				>
					<Icon name="chevron-left" type="fontawesome" />
				</TouchableOpacity>
				<Text style={tw`text-center text-xl py-5 px-10`}>
					Select a Ride -{' '}
					{(parseFloat(travelTimeInformation?.distance.text) * 1.6).toFixed(2)}{' '}
					km
				</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => setSelected(item)}
						style={tw`flex-row justify-between items-center px-10 bg-gray-100 rounded-full mt-2 ${
							item.id === selected?.id && 'bg-yellow-50'
						}`}
					>
						<Image
							style={{ width: 80, height: 80, resizeMode: 'contain' }}
							source={{ uri: item.image }}
						/>
						<View>
							<Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
							<Text>{travelTimeInformation?.duration.text}</Text>
						</View>
						<Text style={tw`text-xl`}>
							{new Intl.NumberFormat('en-us', {
								style: 'currency',
								currency: 'JPY',
							}).format(
								travelTimeInformation?.duration.value *
									SURGE_CHARGE_RATE *
									item.multiplier
							)}
						</Text>
					</TouchableOpacity>
				)}
			/>
			<View style={tw`items-center`}>
				<TouchableOpacity
					style={tw`items-center rounded-full bg-black py-2 px-4 ${
						!selected && 'bg-gray-100'
					}`}
					disabled={!selected}
				>
					<Text style={tw`text-white font-bold text-xl`}>
						Choose {selected?.title ?? 'Ride Option'}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RideOptions;
