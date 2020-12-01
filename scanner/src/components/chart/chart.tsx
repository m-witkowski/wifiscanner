import * as React from 'react';

interface Props {
    channel: number,
    maxRSSI: number,
    activeNetworks: number
}
const generateSquares = (networks: number) =>{
    let squares = [];
    for (let index = 0; index < networks; index++) {
        squares.push(<i className="fas fa-square squareIcon" key={index}></i>);
    }
    return squares;
}


export const Chart: React.FC<Props> = ({ channel, maxRSSI, activeNetworks }) => (
    <p><span className="channels">Ch: {channel} </span>
    <span className="squares">{generateSquares(activeNetworks)}</span>
    <span className="channelSpan">Max RSSI [dBm]: </span> {maxRSSI} </p>
)