import * as React from 'react';
import { Container, Button, Row, Col, Jumbotron } from 'react-bootstrap';
import { NetworkList } from './components/networkList/networkList';
import { Band2Details } from './components/details2/band2Details';
import { Band5Details } from './components/details5/band5Details';
import { ChartData } from './components/chartData/chartData';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export interface Networks {
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


const parseNetworks = (data: any) => {
  let dataToString = data.toString().slice(2).replace(/\\/g, '');
  let parsedData = JSON.parse(dataToString);
  let returnedData = parsedData.map((element: Networks, index: number) => { return { ...element, index: index } });
  return returnedData;
}

interface State {
  setVisibility?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  firstScan: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  scanAgain: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  toggleChart: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  visible: boolean,
  networks: Networks[],
  chartVisibility: boolean
}

interface Props { }

class App extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      networks: [],
      visible: true,
      chartVisibility: false,
      setVisibility: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => this.setState((state) => { return { ...state, visible: !state.visible } })),
      toggleChart: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => this.setState((state) => { return { ...state, chartVisibility: !state.chartVisibility } })),
      firstScan: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => fetch('http://192.168.1.26:5000/data').then(response => response.text().then(result => this.setState(state => { return { ...state, networks: parseNetworks(result), visible: !state.visible } })))),
      scanAgain: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => fetch('http://192.168.1.26:5000/data').then(response => response.text().then(result => this.setState(state => { return { ...state, networks: parseNetworks(result) } }))))
    }
  }


  render() {
    const { networks, visible, chartVisibility, setVisibility, firstScan, scanAgain, toggleChart } = this.state;
    return (
      <div className="App">
        <header className="appHeader">
          <p className="siteTitle"><span className="wifiColor"><i className="fas fa-wifi"></i> WiFi</span> Scanner App</p>
        </header>

        {visible ?
          <Jumbotron className="welcomeScreen d-flex flex-column align-items-center justify-content-center">
            <h2>Welcome to my wireless networks scanning application!</h2>
            <p>For starters, please click the button below.</p>
            <Button onClick={firstScan}>Scan for networks</Button>
          </Jumbotron>
          : null}
        {visible || chartVisibility ? null :
          <Container className="mainBody my-3 d-flex flex-column justify-content-around align-items-center">
            <Row className=" d-flex allign-items-center justify-content-center">
              <Col>
                <NetworkList networks={networks} />
              </Col>
              <Col>
                <Band2Details networks={networks} />
                <Band5Details networks={networks} />
              </Col>
            </Row>
            <Row className=" d-flex allign-items-center justify-content-center buttons">
              <Button className="mx-3" onClick={setVisibility}>Back to homepage</Button>
              <Button className="mx-3" onClick={toggleChart}>Plot chart</Button>
              <Button className="mx-3" onClick={scanAgain}>Scan again</Button>
            </Row>
          </Container>
        }
        {chartVisibility ?
          <Jumbotron className="chartScreen  align-items-center justify-content-center">
            <ChartData networks={networks} />
            <Button className="mx-3" onClick={toggleChart}>Go back</Button>
          </Jumbotron>
          : null}

        <footer className="appFooter">
          <p>Copyrights &copy; <span>Michał Witkowski {(new Date().getFullYear())}</span></p>
        </footer>
      </div>
    )
  }
}

export default App;
