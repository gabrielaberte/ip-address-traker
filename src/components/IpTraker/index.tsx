import React, { useRef, useState } from "react";
import { Input, Card, Col, Row } from "antd";
import "./index.css";
import { getIp } from "../../services/requests";
import "antd/dist/antd.css";
import {
  Container,
  DivBox,
  DivContainerBox,
  DivContainerMap,
  DivHeaders,
  DivTitulo,
} from "../../styles/styles";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";

const { Search } = Input;

function IpTraker() {
  // const map = useMap();
  const animateRef = useRef(false);

  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [isp, setIsp] = useState<string>();
  const [region, setRegion] = useState<string>();
  const [coordinates, setCoordinates] = useState<LatLngExpression>([
    37.38605, -122.08385,
  ]);
  // const maps = useMap();
  // console.log("map center:", map.getCenter());

  const [timeZone, setTimeZone] = useState<string>();

  const [ip, setIp] = useState<string>("");

  const requestApiIp = async (): Promise<void> => {
    try {
      const numeroIp = await getIp(ip);
      console.log(numeroIp);
      setRegion(numeroIp?.location.region);
      setCountry(numeroIp?.location.country);
      setCity(numeroIp?.location.city);
      setIsp(numeroIp?.isp);
      setTimeZone(`UTC${numeroIp?.location.timezone}`);
      setIp(numeroIp?.ip);
      setCoordinates([
        parseFloat(numeroIp?.location.lat),
        parseFloat(numeroIp?.location.lng),
      ]);
    } catch (erro: any) {
      console.log(erro);
    }
  };
  function SetViewOnClick({ animateRef }: any) {
    const map = useMapEvent("click", (e) => {
      map.setView(coordinates, map.getZoom(), {
        animate: animateRef.current || false,
      });
    });

    return null;
  }

  return (
    <div style={{ position: "absolute" }}>
      <Container>
        <DivHeaders>
          <div>
            <DivTitulo>IP Adress Tracker</DivTitulo>
          </div>
          <div>
            <Search
              placeholder="Search for an IP address or domain"
              onChange={(e: any) => setIp(e.target.value)}
              enterButton={">"}
              onSearch={() => requestApiIp()}
              style={{ width: "50vw", borderRadius: "5px" }}
            />
            <br />
          </div>
        </DivHeaders>
      </Container>
      <DivContainerBox>
        <DivBox>
          <div className="site-card-border-less-wrapper">
            <Card bordered={false}>
              <Row
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  height: "150px",
                }}
                gutter={16}
              >
                <Col style={{ borderRight: "1px solid black" }} span={8}>
                  <p style={{ fontWeight: "400" }}>IP ADDRESS</p>
                  <p style={{ fontWeight: "800" }}>{city && ip}</p>
                </Col>
                <Col style={{ borderRight: "1px solid black" }} span={8}>
                  <p style={{ fontWeight: "400" }}>LOCATION</p>
                  <p style={{ fontWeight: "800" }}>
                    {city && `${city}, ${region}, ${country}`}
                  </p>
                </Col>
                <Col style={{ borderRight: "1px solid black" }} span={8}>
                  <p style={{ fontWeight: "400" }}>TIMEZONE</p>
                  <p style={{ fontWeight: "800" }}>{timeZone && timeZone}</p>
                </Col>
                <Col span={8}>
                  <p style={{ fontWeight: "400" }}>ISP</p>
                  <p style={{ fontWeight: "800" }}>{timeZone && isp}</p>
                </Col>
              </Row>
            </Card>
          </div>
        </DivBox>
      </DivContainerBox>
      <DivContainerMap>
        <MapContainer
          id="map"
          center={coordinates}
          zoom={13}
          scrollWheelZoom={true}
        >
          <SetViewOnClick animateRef={animateRef} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </DivContainerMap>
    </div>
  );
}

export default IpTraker;
