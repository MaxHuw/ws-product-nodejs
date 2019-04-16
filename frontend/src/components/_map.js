import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import styled from "styled-components";


////////////////////////////
// Styling

const MapHeader = styled.div`

`

const StyledP = styled.p`
  font-size: 1em;
  text-align: left;
  margin: 0;
`

const MapForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
`


/////////////////

class Map extends React.Component {

  state = {
    endDate: '2017-04-23',
    startDate: '2017-01-01',
    selectedGeoData: "events",
    filteredGeoData: []
  }

  handleChangeStartDate = (event) => this.setState({startDate: event.target.value});
  handleChangeEndDate = (event) => this.setState({endDate: event.target.value});

  selectGeoData = (event) => {
    this.setState({selectedGeoData: event.target.value});
  }

  apiFetch = (api) => {
    fetch(`/${api}/all/?selection=${this.state.selectedGeoData}&start=${this.state.startDate}&end=${this.state.endDate}`)
    .then(results => {
      if(results.status === 500){
        window.alert("Rate Limit Exceeded.");
        throw new Error(results.status)
      } else return results.json();
    })
    .then(results => this.setState({filteredGeoData: results}))
    .catch(error => {
      console.log("Error: ", error)
    })
  }

  filterGeoData = (event) => {
    event.preventDefault();

    if (this.state.selectedGeoData === "events"){
      this.apiFetch('events');
    } else {
      this.apiFetch('stats')
    }
  }

  // circleMarkerColor = (value) => {

  //   console.log('value', value);
  //   let minValue = (this.state.filteredGeoData[0])[this.state.selectedGeoData];
  //   let maxValue = (this.state.filteredGeoData[0])[this.state.selectedGeoData];
  //   let range = maxValue - minValue;

  //   let percentage = (value - minValue) / range;
     
  //   this.state.filteredGeoData.map(location => {
  //     minValue = (location[this.state.selectedGeoData] < minValue) ? location[this.state.selectedGeoData] : minValue;
  //     maxValue = (location[this.state.selectedGeoData] < maxValue) ? location[this.state.selectedGeoData] : maxValue;
  //   })
  //   console.log('min value', minValue)

  //   console.log('percentage ', percentage);

  //   if (percentage < 0.1){
  //     return '#4665f2'
  //   } else if (percentage < 0.2 && percentage >= 0.1){
  //     return '#5264ee'
  //   } else if (percentage < 0.3 && percentage >= 0.2){
  //     return '#6163e7'
  //   } else if (percentage < 0.4 && percentage >= 0.3){
  //     return '#7261df'
  //   } else if (percentage < 0.5 && percentage >= 0.4){
  //     return '#835ed4'
  //   } else if (percentage < 0.6 && percentage >= 0.5){
  //     return '#965ac4'
  //   } else if (percentage < 0.7 && percentage >= 0.6){
  //     return '#aa55b0'
  //   } else if (percentage < 0.8 && percentage >= 0.7){
  //     return '#bd4e98'
  //   } else if (percentage < 0.9 && percentage >= 0.8){
  //     return '#d0467c'
  //   } else if (percentage >= 0.9){
  //     return '#e03b5e'
  //   }
  // }


  componentDidMount(){

  }
  
  render() {

      return (
        <div>
          <MapHeader>
            <StyledP>Data available for dates between 2017-01-01 and 2017-06-16.</StyledP>
            <MapForm className="ui form" onSubmit={this.filterGeoData}>
              <div className="field">
                <select onChange={this.selectGeoData}>
                  <option value="">Data</option>
                  <option value="events">Events</option>
                  <option value="impressions">Impressions</option>
                  <option value="clicks">Clicks</option>
                  <option value="revenue">Revenue</option>
                </select>
              </div>
              
              <div className="field">
                <input type="datetime-local" name="start-date" min="2017-01-01T00:00" max="2017-06-16T00:00" onChange={this.handleChangeStartDate}></input>
              </div>

              <div className="field">
                <input type="datetime-local" name="end-date" min="2017-01-01T00:00" max="2017-06-16T00:00" onChange={this.handleChangeEndDate}></input>
              </div>

              <button className="ui button" type="submit">Submit</button>
            </MapForm>
          </MapHeader>

          <LeafletMap
            center={[50, -100]}
            zoom={3}
            maxZoom={16}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup>
              {(this.state.filteredGeoData).map((location, i) =>
                  <Marker key={i} position={[location.poi_lat, location.poi_lon]} >
                    <Popup>
                      {location.poi_name} <br />
                      {this.state.selectedGeoData} <br />
                      {location[this.state.selectedGeoData]}
                    </Popup>
                  </Marker> 
                )}
            </MarkerClusterGroup>
          </LeafletMap>
        </div>  
      );
  }
}

export default Map;

//Code that does not work. CircleMarker has an issue with MarkerClusterGroup.
// Loads first time, buy once you change anything, it crashes the app.

{/* <MarkerClusterGroup>
{(this.state.filteredGeoData).map((location, i) =>
    <CircleMarker key={i} center={[location.poi_lat, location.poi_lon]} >
      <Popup>
        {location.poi_name} <br />
        {this.state.selectedGeoData} <br />
        {location[this.state.selectedGeoData]}
      </Popup>
    </CircleMarker> 
  )}
</MarkerClusterGroup> */}