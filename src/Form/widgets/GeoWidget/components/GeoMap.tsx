import {latLng, latLngBounds, LatLngExpression} from 'leaflet';
import * as React from 'react';
import {Map, TileLayer, withLeaflet} from 'react-leaflet';

import GeoSearch from './GeoSearch';

import 'leaflet/dist/leaflet.css';
import leafCss from './GeoMap.css';

const Search = withLeaflet(GeoSearch);

interface TGeoMapState {
  position: LatLngExpression;
  isSearchMarkerUsed: boolean;
}

interface TGeoMapProps {
  onChange: (value: LatLngExpression) => void;
  value: LatLngExpression;
}

export class GeoMap extends React.Component<TGeoMapProps, TGeoMapState> {
  private MIN_ZOOM = 2;
  private MAX_ZOOM = 18;
  private MAX_BOUNDS_VISCOSITY = 0.5;
  private BOUNDS_PADDING = 5;

  constructor(props) {
    super(props);

    this.state = {
      position: props.value,
      isSearchMarkerUsed: false,
    };
  }

  public render() {
    return (
      <div className={leafCss.leafletContainer}>
        <Map
          minZoom={this.MIN_ZOOM}
          maxZoom={this.MAX_ZOOM}
          maxBounds={latLngBounds(latLng(-90, -180), latLng(90, 180))}
          bounds={latLngBounds(
            latLng(-90 + this.BOUNDS_PADDING, -180 + this.BOUNDS_PADDING),
            latLng(90 - this.BOUNDS_PADDING, 180 - this.BOUNDS_PADDING),
          )}
          maxBoundsViscosity={this.MAX_BOUNDS_VISCOSITY}
          className={leafCss.leafletContainer}
          animate={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Search
            onMarkerPositionChange={this.handleMarkerPositionChange}
            setSearchMarkerUsed={this.handleLocationChange}
            position={this.state.position}
          />
        </Map>
      </div>
    );
  }

  private handleMarkerPositionChange = position => {
    this.setState({position, isSearchMarkerUsed: true}, () => {
      this.props.onChange(position);
    });
  };

  private handleLocationChange = (used, position) => {
    this.setState({isSearchMarkerUsed: used, position}, () => {
      this.props.onChange(position);
    });
  };
}

export default GeoMap;
