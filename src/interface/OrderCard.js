import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { tailwind } from 'tailwind';
import { format } from 'date-fns';
import { formatDuration, formatKm } from 'utils';
import OrderStatusBadge from './OrderStatusBadge';
import OrderWaypoints from './OrderWaypoints';

const OrderCard = ({ order, onPress, wrapperStyle, containerStyle, headerStyle, waypointsContainerStyle }) => {
    const scheduledAt = order.scheduledAt ? format(order.scheduledAt, 'PPpp') : null;
    const createdAt = order.createdAt ? format(order.createdAt, 'PPpp') : null;

    return (
        <View style={[tailwind('p-2'), wrapperStyle]}>
            <TouchableOpacity style={[tailwind('bg-gray-800 border border-gray-700 rounded-md shadow-sm w-full'), containerStyle]} onPress={onPress}>
                <View style={[tailwind('border-b border-gray-700 py-3 px-3 flex flex-row items-start justify-between'), headerStyle]}>
                    <View style={tailwind('flex flex-col')}>
                        <Text style={tailwind('text-white font-semibold mb-1')}>{order.id}</Text>
                        <Text style={tailwind('text-gray-50 mb-1')}>{scheduledAt ?? createdAt}</Text>
                        <View style={tailwind('flex flex-row')}>
                            <Text style={tailwind('text-gray-100')}>{formatDuration(order.getAttribute('time'))}</Text>
                            <Text style={tailwind('text-gray-100 mx-1')}>•</Text>
                            <Text style={tailwind('text-gray-100')}>{formatKm(order.getAttribute('distance') / 1000)}</Text>
                        </View>
                    </View>
                    <View style={tailwind('flex flex-col items-end justify-start')}>
                        <OrderStatusBadge status={order.getAttribute('status')} />
                        {order.getAttribute('status') === 'created' && order.isDispatched && <OrderStatusBadge status={'dispatched'} wrapperStyle={tailwind('mt-1')} />}
                    </View>
                </View>
                <View style={[tailwind('p-4'), waypointsContainerStyle]}>
                    <OrderWaypoints order={order} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default OrderCard;
