import * as React from 'react';
import {NetworkCard} from '../networkCard/networkCard';
import {Accordion} from 'react-bootstrap';

interface Props {
    networks: Array<{channel: number,
        ccmp: string,
        freq: number,
        mac: string,
        signal: number,
        quality: number,
        ssid: string,
        tkip: string,
        wep: string,
        wpa: string,
        wpa2: string}>
}

export const NetworkList:React.FC<Props> = ({networks}) => (
    <Accordion className ="accordionStyle overflow-auto">
            {/* <NetworkCard {...networkTest}/> */}
            {networks.map((network:any) => 
            <NetworkCard {...network} key={network.index}/>)}
    </Accordion>
);
