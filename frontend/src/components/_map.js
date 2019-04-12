import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { isArray } from 'util';


class Map extends React.Component {

  state = {
  }

  // selectedGeoData = (event) => {
  //   this.setState({selectedGeoData: event.target.value});
  // }

  componentDidMount(){

  }
  
  render() {

    if (isArray(this.props.geoData)){
      return (
        <div>
          <form className="ui form">
            <div className="field">
              <select onChange={this.props.selectedGeoData}>
                <option value="">Data</option>
                <option value="events">Events</option>
                <option value="impressions">Impressions</option>
                <option value="clicks">Clicks</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
          </form>

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
        </div>  
      );
    } else {
      return <p>Loading...</p>
    }

  }
}

export default Map;
