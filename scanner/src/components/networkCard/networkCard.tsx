import * as React from 'react';
//import './networkCard.css';
import { Card, Table, Button, Accordion } from 'react-bootstrap';

interface Props {channel: number,
  ccmp: string,
  freq: number,
  mac: string,
  signal: number,
  quality: number,
  ssid: string,
  tkip: string,
  wep: string,
  wpa: string,
  wpa2: string,
  index: number
}

//teoretycznie powinienem móc zrobić taki myk zamiast props ({ssid, freq... itd.})
export const NetworkCard: React.FC<Props> = ({ ssid, freq, signal, channel, index, quality, mac }) => (
  <Card>
    <Card.Header className="networkCardHeader">
      <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
        {(ssid!=="")?ssid:"SSID Hidden"} Band: {freq>5000?"5 GHz":"2.4 GHz" }
        <div className="signalQualityP">Signal quality: {quality>100?100:quality}%</div> {/* Tutaj dodać coś w stylu props.network ? network.name : 'No networks found' */}
        {/* I tez mozna tutaj dodać podstawowe parametry, tj. poza nazwą jeszcze ikonkę z siłą sygnału albo coś takiego */}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={index.toString()}>
      <Card.Body>
        <Table>
          <thead>
            <tr>
              <th>SSID</th>
              <th>Frequency [MHz]</th>
              <th>RSSI [dBm]</th>
              {/* Dodać więcej parametrów */}
            </tr>
            <tr>
              <th>Channel</th>
              <th>Mac</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{(ssid!=="")?ssid:"SSID Hidden"}</td>
              <td>{freq}</td>
              <td>{signal}</td>
            </tr>
            <tr>
              <td>{channel}</td>
              <td>{mac}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
)