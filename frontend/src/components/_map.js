import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';


class Map extends React.Component {

  componentDidMount(){

  }
  
  render() {

      return (
        <div>
          <form className="ui form" onSubmit={this.props.filterGeoData}>
            <div className="field">
              <select onChange={this.props.selectGeoData}>
                <option value="">Data</option>
                <option value="events">Events</option>
                <option value="impressions">Impressions</option>
                <option value="clicks">Clicks</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
            
            <div className="field">
              <input type="text" name="start-date" placeholder="Start Date yyyy-mm-dd" onChange={this.props.handleChangeStartDate}></input>
            </div>

            <div className="field">
              <input type="text" name="end-date" placeholder="End Date yyyy-mm-dd" onChange={this.props.handleChangeEndDate}></input>
            </div>

            <button className="ui button" type="submit">Submit</button>
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
            {(this.props.filteredGeoData).map((location, i) =>
                <Marker key={i} position={[location.poi_lat, location.poi_lon]}>
                  <Popup>
                    {location.poi_name} <br />
                    {this.props.selectedGeoData} <br />
                    {location[this.props.selectedGeoData]}
                  </Popup>
                </Marker> 
              )}
          </LeafletMap>
        </div>  
      );
  }
}

export default Map;
