import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, TouchableOpacity, Image, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'twrnc';

const data = [
	{
		id: '123',
		title: 'Get a ride',
		image: 'https://links.papareact.com/3pn',
		screen: 'MapScreen',
	},
	{
		id: '456',
		title: 'Order food',
		image: 'https://links.papareact.com/28w',
		screen: 'EatsScreen',
	},
];

// flat list is a component that allows us to render a list of items
// touchable opacity is a component that allows us to make something clickable
// keys allow React to keep track of what is being rendered and what is being changed
const NavOptions = () => {
	const navigation = useNavigation();
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			horizontal
			renderItem={({ item }) => (
				<TouchableOpacity
					style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
					onPress={() => navigation.navigate(item.screen)}
				>
					<View>
						<Image
							style={{ width: 120, height: 120, resizeMode: 'contain' }}
							source={{ uri: item.image }}
						/>
						<Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
						<Icon
							style={tw`p-2 bg-black rounded-full w-10 mt-4`}
							type="antdesign"
							name="arrowright"
							color="white"
						/>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavOptions;
