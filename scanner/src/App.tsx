import * as React from 'react';
import { Container, Button, Row, Col, Jumbotron } from 'react-bootstrap';
import { NetworkList } from './components/networkList/networkList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface Networks {
  ssid: string,
  freq: number,
  signal: number,
  channel: number,
  index: number
}

let testNetworks: Networks[] = [{
  ssid: "Test1",
  freq: 2400,
  signal: 10,
  channel: 12,
  index: 0
}, {
  ssid: "Test2",
  freq: 2400,
  signal: 10,
  channel: 12,
  index: 1
}, {
  ssid: "Test3",
  freq: 2400,
  signal: 10,
  channel: 12,
  index: 2
}, {
  ssid: "Test4",
  freq: 5180,
  signal: 10,
  channel: 12,
  index: 3
}, {
  ssid: "Test5",
  freq: 2400,
  signal: 10,
  channel: 12,
  index: 4
}, {
  ssid: "Test6",
  freq: 2400,
  signal: 10,
  channel: 12,
  index: 5
}, {
  ssid: "Test7",
  freq: 2400,
  signal: 10,
  channel: 12,
  index: 6
},
{
  ssid: "Test8",
  freq: 2400,
  signal: 10,
  channel: 12,
  index: 7
}, {
  ssid: "Test9",
  freq: 2400,
  signal: 10,
  channel: 12,
  index: 8
}]

interface State {
  scanStart?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
  visible: boolean;
  networks: Networks[]
}

interface Props {

}

class App extends React.Component<Props, State>{
  constructor(props: Props){
    super(props);
    this.state = {
      networks: testNetworks,
      visible: true,
      scanStart: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => this.setState((state)=>{return{...state, visible: !state.visible}}))
    }
  }
  render() {
    const {networks, visible, scanStart} = this.state;

    return (
    <div className="App">
      <header className="appHeader">
        <p className="siteTitle"><span className="wifiColor"><i className="fas fa-wifi"></i> WiFi</span> Scanner App</p>
      </header>

      {visible ?
        <Jumbotron className="welcomeScreen d-flex flex-column align-items-center justify-content-center">
          <h2>Welcome to my wireless networks scanning application!</h2>
          <p>For starters, please click the button below.</p>
          <Button onClick={scanStart}>Scan for networks</Button>
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
          <Button className="mx-3">Plot chart</Button>
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
