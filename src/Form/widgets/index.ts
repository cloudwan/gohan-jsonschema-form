import CodeEditorWidget from './CodeEditorWidget';
import DateTimeWidget from './DateTimeWidget';
import GeoWidget from './GeoWidget';
import InputWidget from './InputWidget';
import NotFoundWidget from './NotFoundWidget';
import ObjectWidget from './ObjectWidget';
import PasswordConfirmWidget from './PasswordConfirmWidget';
import SelectWidget from './SelectWidget';
import SwitchWidget from './SwitchWidget';
import UUIDWidget from './UUIDWidget';

const widgets = {
  CodeEditor: CodeEditorWidget,
  Object: ObjectWidget,
  Select: SelectWidget,
  Switch: SwitchWidget,
  Input: InputWidget,
  'password-confirm': PasswordConfirmWidget,
  'date-time': DateTimeWidget,
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
  CodeEditorWidget,
  ObjectWidget,
  SelectWidget,
  SwitchWidget,
  InputWidget,
  PasswordConfirmWidget,
  GeoWidget,
  DateTimeWidget,
};
