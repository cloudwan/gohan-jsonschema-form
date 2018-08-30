/*
 * Extension for existing @types/react-leaflet (v1.1)
 * Adds react-leaflet type definitions for v2.0
 *
 * Remove after @types/react-leaflet update
 */

import * as L from 'leaflet';
import * as React from 'react';
import 'react-leaflet';

declare module 'react-leaflet' {
  export interface LeafletContext {
    map?: L.Map;
    pane?: string;
    layerContainer?: LayerContainer;
    popupContainer?: L.Layer;
  }

  export class LeafletConsumer extends React.Component<
    // tslint:disable-line
    React.ConsumerProps<LeafletContext>
  > {}
  export class LeafletProvider extends React.Component<
    // tslint:disable-line
    React.ProviderProps<LeafletContext>
  > {}

  export interface WrappedProps {
    leaflet: LeafletContext;
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  export function withLeaflet<T extends WrappedProps>(
    WrappedComponent: React.ComponentType<T>,
  ): React.ComponentType<Omit<T, 'leaflet'>>;

  export interface MapLayer {
    contextValue?: LeafletContext;
  }

  export interface Map {
    contextValue?: LeafletContext;
  }
}
