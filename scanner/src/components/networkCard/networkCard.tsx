import * as React from 'react';
//import './networkCard.css';
import { Card, Button, Accordion } from 'react-bootstrap';
import AccordionContext from 'react-bootstrap/AccordionContext';

interface Props {
  channel: number,
  freq: number,
  mac: string,
  signal: number,
  quality: number,
  ssid: string,
  tkip: string,
  wep: string,
  wpa: string,
  wpa2: string,
  ccmp: string,
  index: number
}




//teoretycznie powinienem móc zrobić taki myk zamiast props ({ssid, freq... itd.})
export const NetworkCard: React.FC<Props> = ({ ssid, freq, signal, channel, index, quality, mac, wpa, wpa2, wep, ccmp, tkip }) => {
  const currentEventKey = React.useContext(AccordionContext);
  return (<Card>
    <Card.Header className={`networkCardHeader ${currentEventKey === index.toString() ? 'active' : 'default'}`}>
      <Accordion.Toggle className={currentEventKey === index.toString() ? 'activeButton' : 'default'} as={Button} variant="link" eventKey={index.toString()}>
        {(ssid !== "" && !(String(ssid) === "x00x00x00x00x00x00x00")) ? ssid : "SSID Hidden"} {(String(wpa2) === "y" && String(ccmp) === "y" ? <i className="fas fa-lock"></i> : (String(wpa) === "y" && String(tkip) === "y" ? <i className="fas fa-unlock"></i> : <i className="fas fa-lock-open"></i>))}
        <div className="signalQualityP">Signal quality: {quality > 100 ? 100 : quality}%</div> {/* Tutaj dodać coś w stylu props.network ? network.name : 'No networks found' */}
        {/* I tez mozna tutaj dodać podstawowe parametry, tj. poza nazwą jeszcze ikonkę z siłą sygnału albo coś takiego */}
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey={index.toString()}>
      <Card.Body className="cardStyle">
        <p><span className="cardSpan">SSID:</span> {(ssid !== "" && !(String(ssid) === "x00x00x00x00x00x00x00")) ? ssid : "Hidden"}</p>
        <p><span className="cardSpan">Band:</span> {freq > 5000 ? "5 GHz" : "2.4 GHz"}</p>
        <p><span className="cardSpan">Frequency [MHz]:</span> {freq}</p>
        <p><span className="cardSpan">RSSI [dBm]:</span> {signal}</p>
        <p><span className="cardSpan">Channel:</span> {channel}</p>
        <p><span className="cardSpan">Mac Adress:</span> {String(mac).toLocaleUpperCase()}</p>
        <p><span className="cardSpan">Security:</span> {(String(wpa2) === "y" && String(ccmp) === "y" && String(tkip) === "y" ? "WPA2-PSK(AES/TKIP)" :
          String(wpa2) === "y" && String(ccmp) === "y" ?
            "WPA2-PSK(AES)" :
            String(wpa2) === "y" && String(tkip) === "y" ? "WPA2-PSK(TKIP)" :
              String(wpa) === "y" && String(ccmp) === "y" ? "WPA-PSK(AES)" :
                String(wpa) === "y" && String(tkip) === "y" ? "WPA-PSK(TKIP)" : String(wep) === "y" ? "WEP" : "Open")} </p>
      </Card.Body>
    </Accordion.Collapse>
  </Card>)
}
