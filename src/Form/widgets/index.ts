import ArrayWidget from './ArrayWidget';
import CheckboxWidget from './CheckboxWidget';
import CodeEditorWidget from './CodeEditorWidget';
import GeoWidget from './GeoWidget';
import InputWidget from './InputWidget';
import NotFoundWidget from './NotFoundWidget';
import ObjectWidget from './ObjectWidget';
import PasswordConfirmWidget from './PasswordConfirmWidget';
import SelectWidget from './SelectWidget';
import SwitchWidget from './SwitchWidget';
import UUIDWidget from './UUIDWidget';

const widgets = {
  Array: ArrayWidget,
  Checkbox: CheckboxWidget,
  CodeEditor: CodeEditorWidget,
  Object: ObjectWidget,
  Select: SelectWidget,
  Switch: SwitchWidget,
  Input: InputWidget,
  'password-confirm': PasswordConfirmWidget,
  uuid: UUIDWidget,
  Geo: GeoWidget,
};

export const selectWidget = (name: string) => {
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
  SwitchWidget,
  InputWidget,
  PasswordConfirmWidget,
  GeoWidget,
};
