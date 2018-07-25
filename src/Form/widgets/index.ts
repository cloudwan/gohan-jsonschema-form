import ArrayWidget from './ArrayWidget';
import CheckboxWidget from './CheckboxWidget';
import CodeEditorWidget from './CodeEditorWidget';
import NotFoundWidget from './NotFoundWidget';
import ObjectWidget from './ObjectWidget';
import SelectWidget from './SelectWidget';

import NumberField from '../fields/NumberField';
import StringField from '../fields/StringField';

const widgets = {
  ArrayWidget,
  CheckboxWidget,
  CodeEditorWidget,
  ObjectWidget,
  SelectWidget,
  NumberField,
  StringField,
};

export const getWidget = (name: string) => {
  const Widget = widgets[name];

  if (Widget) {
    return Widget;
  }
  return NotFoundWidget;
};

export {
  ArrayWidget,
  CheckboxWidget,
  CodeEditorWidget,
  ObjectWidget,
  SelectWidget,
  NumberField,
  StringField,
};
