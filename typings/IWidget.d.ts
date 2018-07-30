import {JSONSchema4} from 'json-schema';
import {IUiSchema} from './IUiSchema';

export interface IWidget {
  schema: JSONSchema4;
  uiSchema?: IUiSchema;
  value?: any[] | boolean | number | null | object | string;
  isRequired?: boolean;
  id?: string;
}
