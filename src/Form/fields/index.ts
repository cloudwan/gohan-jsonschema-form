import ArrayWidget from '../widgets/ArrayWidget';
import CheckboxWidget from '../widgets/CheckboxWidget';
import CodeEditorWidget from '../widgets/CodeEditorWidget';
import NotFoundWidget from '../widgets/NotFoundWidget';
import ObjectWidget from '../widgets/ObjectWidget';
import SelectWidget from '../widgets/SelectWidget';
import NumberField from './NumberField';
import StringField from './StringField';

const fields = {
  Array: ArrayWidget,
  Boolean: CheckboxWidget,
  Code: CodeEditorWidget,
  String: StringField,
  Number: NumberField,
  Object: ObjectWidget,
  Select: SelectWidget,
  NotFound: NotFoundWidget,
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
