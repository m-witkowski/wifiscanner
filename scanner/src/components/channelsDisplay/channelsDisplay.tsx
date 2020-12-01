import * as React from 'react';

interface Props {
    channel: number,
    maxRSSI: number,
    activeNetworks: number
}

export const ChannelsDisplay: React.FC<Props> = ({ channel, maxRSSI, activeNetworks }) => (
    <p><span className="cardSpan">Channel: </span> {channel} <span className="channelSpan">Networks: </span> {activeNetworks} <span className="channelSpan">Max RSSI [dBm]: </span> {maxRSSI} </p>
)