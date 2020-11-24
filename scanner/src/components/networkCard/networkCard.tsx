import * as React from 'react';
//import './networkCard.css';
import { Card, Table, Button, Accordion } from 'react-bootstrap';

interface Props {
  ssid: string,
  freq: number,
  signal: number,
  channel: number,
  index: number
}

//teoretycznie powinienem móc zrobić taki myk zamiast props ({ssid, freq... itd.})
export const NetworkCard: React.FC<Props> = ({ ssid, freq, signal, channel, index }) => (
  <Card>
    <Card.Header className="networkCardHeader">
      <Accordion.Toggle as={Button} variant="link" eventKey={index.toString()}>
        {ssid} {/* Tutaj dodać coś w stylu props.network ? network.name : 'No networks found' */}
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
              <th>Signal</th>
              <th>Channel</th>
              {/* Dodać więcej parametrów */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ssid}</td>
              <td>{freq}</td>
              <td>{signal}</td>
              <td>{channel}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
)