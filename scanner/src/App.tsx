import * as React from 'react';
import { Container, Button, Row, Col, Jumbotron } from 'react-bootstrap';
import { NetworkList } from './components/networkList/networkList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

interface Networks {
  channel: number,
  ccmp: string,
  freq: number,
  mac: string,
  signal: number,
  quality: number,
  ssid: string,
  tkip: string,
  wep: string,
  wpa: string,
  wpa2: string
}


const parseNetworks = (data:any) => {
  let dataToString = data.toString().slice(2).replace(/\\"/g, '');
  console.log(dataToString);
  let parsedData = JSON.parse(dataToString);
  let returnedData = parsedData.map((element: Networks, index: number) => {return{...element, index: index}});
  return returnedData;
}

interface State {
  scanStart?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  scanResult: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  visible: boolean,
  networks: Networks[]
}

interface Props {

}

class App extends React.Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      networks: [],
      visible: true,
      scanStart: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => this.setState((state)=>{return{...state, visible: !state.visible}})),
      scanResult: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => axios.get('/data').then(response => {this.setState(state => {return{...state, networks: parseNetworks(response.data), visible: !state.visible}})}))
    }
  }


  render() {
    const {networks, visible, scanStart, scanResult} = this.state;
    return (
    <div className="App">
      <header className="appHeader">
        <p className="siteTitle"><span className="wifiColor"><i className="fas fa-wifi"></i> WiFi</span> Scanner App</p>
      </header>

      {visible ?
        <Jumbotron className="welcomeScreen d-flex flex-column align-items-center justify-content-center">
          <h2>Welcome to my wireless networks scanning application!</h2>
          <p>For starters, please click the button below.</p>
          <Button onClick={scanResult}>Scan for networks</Button>
        </Jumbotron>
        : null}
        {visible ? null : 
        <Container className="mainBody my-3 d-flex flex-column justify-content-around align-items-center">
        <Row className=" d-flex allign-items-center justify-content-center">
          <Col>
            <NetworkList networks={networks} />
          </Col>
          <Col>
            <div className="details1"></div>
            <div className="details2"></div>
          </Col>
        </Row>
        <Row className=" d-flex allign-items-center justify-content-center buttons">
          <Button className="mx-3" onClick={scanResult}>Plot chart</Button>
          <Button className="mx-3" onClick={scanStart}>Scan again</Button>
        </Row>
      </Container>
        }
      
      <footer className="appFooter">
        <p>Copyrights &copy; <span>Michał Witkowski {(new Date().getFullYear())}</span></p>
      </footer>
    </div>
  )}
}

export default App;
