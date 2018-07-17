import {JSONSchema4} from 'json-schema';
import {IUiSchema} from './IUiSchema';

export interface IWidget {
  schema: {
    [key: string]: JSONSchema4;
  };
  uiSchema?: {
    [key: string]: IUiSchema;
  };
  value?: any[] | boolean | number | null | object | string;
  required?: boolean;
}
