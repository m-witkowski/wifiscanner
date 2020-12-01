import * as React from 'react';
import { Networks } from '../../App';
import { ChannelsDisplay } from '../channelsDisplay/channelsDisplay'

interface Props {
    networks: Networks[]
}

interface channelDetails {
    channel: number,
    activeNetworks: number,
    maxRSSI: number
}


const numberOfNetworks = (networks: Networks[]) => {
    let count = 0;
    networks.forEach((network) =>
        network.freq >= 5000 ? count++ : count
    )
    return count;
}

const filterNetworks = (networks: Networks[]) => {
    return networks.filter(network => network.channel > 14)
}

const channelsFound = (networks: Networks[]) => {
    let channels: channelDetails[] = [];
    networks.forEach(network => {
        channels.some(channel => channel.channel === network.channel) ?
            channels.forEach(channel => {
                if (channel.channel === network.channel) {
                    channel.maxRSSI = channel.maxRSSI > network.signal ? channel.maxRSSI : network.signal;
                    channel.activeNetworks++;
                }
            })
            : channels.push({ channel: network.channel, maxRSSI: network.signal, activeNetworks: 1 })
    });
    return channels;
}


export const Band5Details: React.FC<Props> = ({ networks }) => {
    let channels = (channelsFound(filterNetworks(networks))).sort((a, b) => a.channel - b.channel);
    return (
        <div className="details1">
            <h4 className="displayTitle">5 GHz Band</h4>
            {(numberOfNetworks(networks) === 1 ?
                <p>Found {numberOfNetworks(networks)} network</p>
                :
                <p>Found {numberOfNetworks(networks)} networks</p>)}
            <div className="channelsDisplay">
                {channels.map((channel) =>
                    <ChannelsDisplay {...channel} />)}
            </div>
        </div>
    )
}
