import * as React from 'react';
import { Networks } from '../../App';
import { Chart } from '../chart/chart';
import { Container, Row, Col } from 'react-bootstrap'


interface Props {
    networks: Networks[]
}

interface channelDetails {
    channel: number,
    activeNetworks: number,
    maxRSSI: number
}


// const numberOfNetworks = (networks: Networks[]) => {
//     let count2 = 0;
//     let count5 = 0;
//     networks.forEach((network) =>
//         network.freq < 5000 ? count2++ : count5++
//     )
//     return { count2, count5 };
// }
//do odczytu const {count2, count5} = numberOfNetworks();

const filterNetworks = (networks: Networks[], band: boolean) => {
    return band ? networks.filter(network => network.channel < 14) : networks.filter(network => network.channel > 14);
}

const chartData = (networks: Networks[]) => {
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

export const ChartData: React.FC<Props> = ({ networks }) => {
    let channels2 = (chartData(filterNetworks(networks, true))).sort((a, b) => a.channel - b.channel);
    let channels5 = (chartData(filterNetworks(networks, false))).sort((a, b) => a.channel - b.channel);
    return (
        <Container className="d-flex flex-column">
            <Row className="d-flex">
                <Col className="mt-2">
                    <h4 className="displayTitle">2.4 GHz Band</h4>
                    <div className="chartDisplay">
                        {channels2.map((channel) =>
                            <Chart {...channel} />)}
                    </div>
                </Col>
                <Col className="mt-2">
                    <h4 className="displayTitle">5 GHz Band</h4>
                    <div className="chartDisplay">
                        {channels5.map((channel) =>
                            <Chart {...channel} />)}
                    </div>
                </Col>

            </Row>

        </Container>
    )
}