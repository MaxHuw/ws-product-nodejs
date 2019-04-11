import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { isArray } from 'util';


class Map extends React.Component {
  componentDidMount(){

  }

  render() {

    if (isArray(this.props.geoData)){
      return (
        <LeafletMap
          center={[50, -100]}
          zoom={3}
          maxZoom={10}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {(this.props.geoData).map((location, i) =>
              <Marker key={i} position={[location.lat, location.lon]}>
                <Popup>
                  {location.name}
                </Popup>
              </Marker> 
            )}
        </LeafletMap>
      );
    } else {
      return <p>Loading...</p>
    }

  }
}

export default Map;
