# Widgets

## Widget interface

Props | Description | Default
--- | --- | ---
`schema` | The JSON schema for this field | {}
`uiSchema` | The uiSchema for this field | {}
`value` | The form data for this. field | undefined
`required` | A field required flag | false

## List of supported widgets

Widget name | Description | Value type
--- | --- | ---
`text` | A basic widget for getting the user text input | string
`checkbox` | A basic checkbox widget | boolean
`switch` | A switch widget - alternative for a checkbox widget when we want to chose true or false value  | boolean
`number` | A basic widget for getting the user number input | number
`select` | A select widget with multiple options | string, number, boolean
`date` | A date picker widget | number
`dateTime` | A date-time picker widget | number
`id` | Widget generates random uuid string  | string
`range` | A slider widget that allows user to pick min and max values in a range  | object
`map` | A map widget with location search | object
`yaml` | A code editor widget for yaml | object
`hidden` | A invisible widget which gets value from the `formData` prop | string, number, boolean
