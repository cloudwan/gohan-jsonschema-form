# UiSchema

**TODO:**

- [ ] select widget customization
  - [ ] dynamic data fetching
  - [ ] fetching additional resources
- [ ] internalization

**Other ideas:**

- [ ] layout
- [ ] no title property
- [ ] required
- [ ] inline title for checkbox
- [ ] multiple checkboxes widget

A UI schema is basically an object literal following the tree structure of the form field hierarchy. It provides information on how the form should be rendered, while the JSON schema tells what.

##### Table of Contents

  - [Custom widget](#custom-widget)
  - [Custom field](#custom-field)
  - [Custom labels for select widget options](#custom-labels-for-select-widget-options)
  - [Dynamic data fetching in SelectWidget](#dynamic-data-fetching-in-selectwidget)
  - [Field helper link](#field-helper-link)
  - [Show/hide individual fields](#showhide-individual-fields)
  - [Custom title and description fields](#custom-title-and-description-fields)
  - [Disabled fields](#disabled-fields)
  - [Read-only fields](#read-only-fields)
  - [Fields order](#fields-order)

<a name="custom_widget" href="#"></a>
## **Custom widget**

The uiSchema `ui:widget` property allows to define which widget should be rendered. You can also pass some custom props to the widget, using `ui:options`, property.

Example:

```js
const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    }
  }
};

const uiSchema = {
  id: {
    'ui:widget': 'id',
    'ui:options': {
      className: 'important',
    }
  }
};
```

You can also pass directly component instead of component name to the `ui:widget` property.

```js
const IdWidget = ({value, onChange}) => (
  <div>
    <input type="text" value={vlaue} onChange={onChange} />
  </div>
);

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    }
  }
};

const uiSchema = {
  id: {
    'ui:widget': IdWidget,
  }
};
```

**List of supported widgets:**

- text
- checkbox
- switch
- select
- number
- range
- date
- dateTime
- id
- map
- yaml
- hidden

<a name="field" href="#"></a>
## **Custom field**

```js
const uiSchema = {
  configuration: {
    'ui:field': 'yaml',
  }
}
```

<a name="selectwidget_label" href="#"></a>
## Custom labels for select widget options

Template:

- `<%item%>` - Outputs the item value into the template
- `<%item.property%>` - Outputs the item property value into the template
- `<%#item%>` - Fetch item and outputs its value into the template

```js
const uiSchema = {
  car: {
    'ui:label': `<%#car.model%>, <%#car.year%>`
  }
}
```

<a name="selectwidget_fetching" href="#"></a>
## Dynamic data fetching in SelectWidget

```js
const uiSchema = {
  car: {
    'ui:fetch': {
      url: 'http://sample.com/cars/'
      query: {
        filters: {
          manufacturer: 'foo'
        },
        fields: [
          'model'
        ]
      },
      onDemand: true,
    }
  }
}
```

<a name="helper_link" href="#"></a>
## **Field helper link**

```js
const uiSchema = {
  configuration: {
    'ui:helpLink': {
      label: 'More...',
      url: 'http://foo.com',
    }
  }
}
```


<a name="hide" href="#"></a>
## **Show/hide individual fields**

The uiSchema `ui:logic` property allows to hide specific fields based on selected value.

```js
const schema = {
  type: object,
  properties: {
    account_type: {
      type: ['string', 'null'],
      enum: [
        'admin',
        'user',
        'super-admin'
      ]
    },
    username: {
      type: 'string'
    },
    adminId: {
      type: 'string'
    }
    address: {
      type: 'object',
      items: {
        properties: {
          country: {type: 'string'},
          city: {type: 'string'},
          street: {type: 'string'},
        }
      }
    }
  }
}

const uiSchema = {
  account_type: {
    'ui:logic': [
      // Hide fields for single value
      // When value will be user, hide adminId field
      {
        test: 'user',
        hide: ['adminId'],
      },
      // Hide fields for few values
      // When value will be admin or super-admin, hide username field
      {
        test: 'admin|super-admin',
        hide: ['username'],
      },
      // Hide fields for values other than one specified
      // When value will be other than user, hide username field
      {
        test: '^((?!user).)*$',
        hide: ['username'],
      },
      // Hide nested field
      // When value will be super-admin, hide street field inside address field
      {
        test: 'super-admin',
        hide: ['address.street'],
      },
      // Hide specified fields when nothing is selected
      // When noting is selected, hide adminId field
      {
        test: '',
        hide: ['adminId'],
      }
    ]
  }
}
```
<a name="title_description" href="#"></a>
## **Custom title and description fields**

To change field title or description you can use `ui:title` and `ui:description` properties.

Example:

```js
const uiSchema = {
  name: {
    'ui:title': 'First Name',
    'ui:description': 'Please fill your first name',
  }
}
```

<a name="disabled" href="#"></a>
## **Disabled fields**
The uiSchema `ui:disable` property will disable all field child widgets.

```js
const uiSchema = {
  name: {
    'ui:disabled': true,
  }
}
```

<a name="readonly" href="#"></a>
## **Read-only fields**
The uiSchema `ui:disable` property will mark all field child widgets as read-only.

```js
const uiSchema = {
  name: {
    'ui:readonly': true,
  }
}
```

<a name="order" href="#"></a>
## **Fields order**

The uiSchema `ui:order` property allows to change the order of rendered fields, by overriding schema `propertiesOrder` property.

Example:

```js
const schema = {
  type: 'object',
  properties: {
    description: {type: 'string'},
    title: {type: 'string'},
    content: {type: 'string'},
  }
}

const uiSchema = {
  'ui:order': ['title', 'description', 'content'],
}
```
