import * as React from 'react';

import {latLng, latLngBounds} from 'leaflet';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import leafCss from './GeoWidget.css';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

const boundsPadding = 5;

export default class GeoWidget extends React.Component<IWidget> {
  public render() {
    return (
      <div>
        <Map
          center={[52, 21]}
          minZoom={2}
          maxZoom={18}
          maxBounds={latLngBounds(latLng(-90, -180), latLng(90, 180))}
          bounds={latLngBounds(
            latLng(-90 + boundsPadding, -180 + boundsPadding),
            latLng(90 - boundsPadding, 180 - boundsPadding),
          )}
          boundsOptions={{padding: [50, 50]}}
          maxBoundsViscosity={0.5}
          animate={true}
          className={leafCss.leafletContainer}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[52, 21]}>
            <Popup>
              A pretty CSS3 popup.<br />Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}
