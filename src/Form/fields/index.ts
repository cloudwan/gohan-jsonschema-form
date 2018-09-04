import CodeEditorWidget from '../widgets/CodeEditorWidget';
import NotFoundWidget from '../widgets/NotFoundWidget';
import ObjectWidget from '../widgets/ObjectWidget';
import RangeWidget from '../widgets/RangeWidget';
import ArrayField from './ArrayField';
import BooleanField from './BooleanField';
import NumberField from './NumberField';
import SelectField from './SelectField';
import StringField from './StringField';

const fields = {
  Array: ArrayField,
  Boolean: BooleanField,
  Code: CodeEditorWidget,
  String: StringField,
  Number: NumberField,
  Object: ObjectWidget,
  Select: SelectField,
  NotFound: NotFoundWidget,
  Range: RangeWidget,
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
