import NotFoundWidget from '../widgets/NotFoundWidget';
import ArrayField from './ArrayField';
import BooleanField from './BooleanField';
import CodeEditorField from './CodeEditorField';
import GeoField from './GeoField';
import NumberField from './NumberField';
import ObjectField from './ObjectField';
import RangeField from './RangeField';
import SelectField from './SelectField';
import StringField from './StringField';
import YamlField from './YamlField';

const fields = {
  Array: ArrayField,
  Boolean: BooleanField,
  Code: CodeEditorField,
  String: StringField,
  Number: NumberField,
  Object: ObjectField,
  Select: SelectField,
  NotFound: NotFoundWidget,
  Range: RangeField,
  Geo: GeoField,
  Yaml: YamlField,
};

export default fields;

export function selectField(name: any) {
  if (typeof name === 'string') {
    if (fields.hasOwnProperty(name)) {
      return fields[name];
    } else {
      console.error(
        `Field ${name} is not supported! Supported fields: ${Object.keys(
          fields,
        ).join(', ')}`,
      );

      return fields.NotFound;
    }
  } else {
    console.error(
      `Unsupported type of field got ${typeof name}, should be string.`,
    );

    return fields.NotFound;
  }
}
