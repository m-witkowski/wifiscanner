import * as React from 'react';
import {NetworkCard} from '../networkCard/networkCard';
import {Accordion} from 'react-bootstrap';

interface Props {
    networks: Array<{ssid: string, freq: number, signal: number, channel: number, index: number}>
}

export const NetworkList:React.FC<Props> = ({networks}) => (
    <Accordion className ="accordionStyle overflow-auto">
            {/* <NetworkCard {...networkTest}/> */}
            {networks.map((network:any) => 
            <NetworkCard {...network} key={network.index}/>)}
    </Accordion>
);
