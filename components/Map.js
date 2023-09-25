import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectOrigin,
	selectDestination,
	setTravelTimeInformation,
} from '../slices/navSlice';
import MapsViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '@env';

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!origin || !destination) return;
		// Zoom & fit to markers
		mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
			edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
		});
	}, [origin, destination]);

	// This useEffect is going to be just for calculating the travel time
	useEffect(() => {
		if (!origin || !destination) return;
		const getTravelTime = async () => {
			fetch(
				`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`
			)
				.then((res) => res.json())
				.then((data) =>
					dispatch(setTravelTimeInformation(data?.rows[0].elements[0]))
				);
		};
		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_API_KEY]);

	return (
		<MapView
			ref={mapRef}
			mapType="mutedStandard"
			style={tw`flex-1`}
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005, // typical zoom level when we want street level distance
				longitudeDelta: 0.005,
			}}
		>
			{origin && destination && (
				<MapsViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_API_KEY}
					strokeWidth={3}
					strokeColor="black"
				/>
			)}
			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destination"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});
