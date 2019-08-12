export interface IOptions {
  [key: string]: any;
}

export interface ILogic {
  test: string;
  hide: string[];
}

export interface IFetch {
  url: string;
  query?: {
    filters?: {
      [key: string]: string;
    };
    fields: string[];
  };
  fetchData: (url: string, query?: string) => any;
  onDemand?: boolean;
}

export interface IHelpLink {
  label: string;
  url: string;
}

export interface IProperties {
  [key: string]: IUiSchema;
}

export interface IItems {
  properties?: IProperties;
}

export interface ILabel {
  template: string;
}

export interface IUiSchema {
  'ui:widget'?: string | React.Component;
  'ui:options'?: IOptions;
  'ui:field'?: string | React.Component;
  'ui:logic'?: ILogic[];
  'ui:title'?: string;
  'ui:description'?: string;
  'ui:order'?: string[];
  'ui:label'?: ILabel;
  'ui:fetch'?: IFetch;
  'ui:helpLink'?: IHelpLink;
  'ui:disabled'?: boolean;
  'ui:readonly'?: boolean;
  'ui:format'?: string;
  properties?: IProperties;
  items?: IItems;
}
