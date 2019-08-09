import L from 'leaflet';
import {GeoSearchControl, OpenStreetMapProvider} from 'leaflet-geosearch';
import * as React from 'react';

import {Api} from '../../../api';

import 'leaflet-geosearch/assets/css/leaflet.css';

interface TGeoSearchProps {
  setSearchMarkerUsed: (boolean, object) => void;
  onMarkerPositionChange: (object) => void;
  leaflet: any;
  position: {
    lat: number;
    lng: number;
  };
}

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default class GeoSearch extends React.Component<TGeoSearchProps> {
  private searchBox;
  private provider;

  constructor(props) {
    super(props);

    this.reverseSearch.bind(this);
  }

  public async componentDidMount() {
    const {lat, lng: lon} = this.props.position;
    this.provider = new OpenStreetMapProvider();
    this.searchBox = new GeoSearchControl({
      provider: this.provider,
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      popupFormat: ({result}) => result.label,
      style: 'bar',
      autoClose: true,
      keepResult: true,
      marker: {
        draggable: true,
      },
      animateZoom: false,
      retainZoomLevel: true,
    }).addTo(this.props.leaflet.map);

    if (lat && lon) {
      const {input} = this.searchBox.searchElement.elements;
      const response = await this.reverseSearch({lat, lon});
      if (response) {
        this.searchBox.showResult(response, {
          data: response,
          query: response.label,
        });
        input.value = response.label;
      }
    }

    this.props.leaflet.map.on('geosearch/showlocation', evt => {
      this.props.setSearchMarkerUsed(true, {
        lng: Number(evt.location.x),
        lat: Number(evt.location.y),
      });
    });

    this.props.leaflet.map.on('geosearch/marker/dragend', async evt => {
      const {input} = this.searchBox.searchElement.elements;
      const response = await this.reverseSearch({
        lat: evt.location.lat,
        lon: evt.location.lng,
      });

      if (response) {
        this.searchBox.showResult(response, {
          data: response,
          query: response.label,
        });
        input.value = response.label;
      }

      this.props.onMarkerPositionChange(evt.location);
    });
  }

  public render() {
    return null;
  }

  private async reverseSearch(params) {
    const baseUrl = 'https://nominatim.openstreetmap.org/reverse';
    const query = this.provider.getParamString({
      ...params,
      osm_type: 'N',
      format: 'json',
    });
    try {
      const response = await Api.fetch(`${baseUrl}?${query}`);
      return this.provider.parse({data: [response]})[0];
    } catch (error) {
      console.error(error.statusText);
    }
  }
}
