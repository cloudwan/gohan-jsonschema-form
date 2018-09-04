import CheckboxWidget from './CheckboxWidget';
import CodeEditorWidget from './CodeEditorWidget';
import InputWidget from './InputWidget';
import NotFoundWidget from './NotFoundWidget';
import ObjectWidget from './ObjectWidget';
import PasswordConfirmWidget from './PasswordConfirmWidget';
import SelectWidget from './SelectWidget';
import SwitchWidget from './SwitchWidget';
import UUIDWidget from './UUIDWidget';

const widgets = {
  Checkbox: CheckboxWidget,
  CodeEditor: CodeEditorWidget,
  Object: ObjectWidget,
  Select: SelectWidget,
  Switch: SwitchWidget,
  Input: InputWidget,
  'password-confirm': PasswordConfirmWidget,
  uuid: UUIDWidget,
};

export const selectWidget = (name: string) => {
  const Widget = widgets[name];

  if (Widget) {
    return Widget;
  }
  return NotFoundWidget;
};

export {
  CheckboxWidget,
  CodeEditorWidget,
  ObjectWidget,
  SelectWidget,
  SwitchWidget,
  InputWidget,
  PasswordConfirmWidget,
};
