import * as React from 'react';

import {latLng, latLngBounds} from 'leaflet';
import {Map, Marker, Popup, TileLayer, withLeaflet} from 'react-leaflet'; // tslint:disable-line
import {ReactLeafletSearch} from 'react-leaflet-search';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-search/lib/react-leaflet-search.css';
import leafCss from './GeoWidget.css';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

const boundsPadding = 5;

export default class GeoWidget extends React.Component<IWidget> {
  public render() {
    const SearchBox = withLeaflet(ReactLeafletSearch);

    return (
      <div>
        <Map
          minZoom={2}
          maxZoom={18}
          maxBounds={latLngBounds(latLng(-90, -180), latLng(90, 180))}
          bounds={latLngBounds(
            latLng(-90 + boundsPadding, -180 + boundsPadding),
            latLng(90 - boundsPadding, 180 - boundsPadding),
          )}
          maxBoundsViscosity={0.5}
          animate={true}
          className={leafCss.leafletContainer}
          viewport={{
            center: {lat: 52, lng: 21},
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <SearchBox
            position="bottomleft"
            inputPlaceholder="Search for address"
            search={[52, 21]}
            showPopup={false}
            showMarker={true}
            closeResultsOnClick={false}
          />
          {/*<Marker position={{lat: 52, lng: 21}}>
            <Popup>
              A pretty CSS3 popup.<br />Easily customizable.
            </Popup>
          </Marker>*/}
        </Map>
      </div>
    );
  }
}
