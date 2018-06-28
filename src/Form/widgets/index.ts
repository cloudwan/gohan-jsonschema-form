import ArrayWidget from './ArrayWidget';
import CheckboxWidget from './CheckboxWidget';
import CodeEditorWidget from './CodeEditorWidget';
import InputWidget from './InputWidget';
import NotFoundWidget from './NotFoundWidget';
import ObjectWidget from './ObjectWidget';
import SelectWidget from './SelectWidget';

const widgets = {
  ArrayWidget,
  CheckboxWidget,
  CodeEditorWidget,
  InputWidget,
  ObjectWidget,
  SelectWidget,
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
  InputWidget,
  ObjectWidget,
  SelectWidget,
};
