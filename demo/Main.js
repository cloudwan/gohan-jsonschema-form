import React, {Component} from 'react';
import {ObjectInspector} from 'react-inspector';
import {safeLoad, dump} from 'js-yaml';
import {Button} from 'antd';

import SchemaEditor from './components/SchemaEditor';
import {Form} from './../src';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      schema: {
        permission: ['create', 'read', 'update', 'delete'],
        properties: {
          flavor_id: {
            description: 'The Flavor of Device Profile',
            permission: ['create'],
            relation: 'ese_device_flavor',
            relation_property: 'ese_device_flavor',
            title: 'Flavor',
            type: 'string',
          },
          id: {
            description: 'ID',
            maxLength: 255,
            permission: ['create'],
            title: 'ID',
            type: 'string',
            view: ['detail'],
          },
          is_cloud_connector: {
            default: false,
            description: 'This device is a Cloud Connector.',
            permission: ['create', 'update'],
            title: 'Is a Cloud Connector',
            type: 'boolean',
          },
          name: {
            description: '',
            maxLength: 255,
            permission: ['create', 'update'],
            title: 'Name',
            type: 'string',
          },
          physical_port_types: {
            description: 'List of physical port types on Device',
            items: {
              additionalProperties: false,
              properties: {
                bandwidth: {
                  default: 1,
                  description: 'NIC Bandwidth',
                  minimum: 1,
                  title: 'Bandwidth',
                  type: 'integer',
                },
                interface_type: {
                  description: 'Interface Type',
                  enum: [
                    'primary',
                    'secondary',
                    'tertiary',
                    'tenant',
                    'management',
                  ],
                  title: 'Interface Type',
                  type: ['string', 'null'],
                },
                link_type: {
                  default: 'Ethernet',
                  description: 'Link Type',
                  enum: ['Ethernet', 'LTE', 'Wi-Fi', 'Fiber'],
                  title: 'Link Type',
                  type: 'string',
                },
                name: {
                  description: 'Interface Name',
                  title: 'Interface Name',
                  type: 'string',
                },
                units: {
                  default: 'Gb',
                  description: 'Bandwidth Units',
                  enum: ['Kb', 'Mb', 'Gb'],
                  title: 'Bandwidth Units',
                  type: 'string',
                },
              },
              required: [
                'name',
                'link_type',
                'interface_type',
                'bandwidth',
                'units',
              ],
              type: 'object',
            },
            permission: ['create', 'update'],
            title: 'Physical port types',
            type: 'array',
          },
          service_levels: {
            default: ['BASIC'],
            description: 'Service Level for the Device',
            items: {
              description: 'Service Level',
              enum: ['BASIC', 'ADVANCED'],
              title: 'Service Level',
              type: 'string',
            },
            permission: ['create'],
            title: 'Service Levels',
            type: 'array',
            uniqueItems: true,
          },
        },
        propertiesOrder: [
          'id',
          'name',
          'is_cloud_connector',
          'service_levels',
          'flavor_id',
          'physical_port_types',
        ],
        required: [
          'name',
          'flavor_id',
          //  "service_levels",
          'physical_port_types',
        ],
        type: 'object',
      },
      uiSchema: {},
    };
  }
  handlerSchemaChange = schema => {
    try {
      this.setState({schema: safeLoad(schema)});
    } catch (e) {
      console.log(e);
    }
  };

  handlerUISchemaChange = uiSchema => {
    try {
      this.setState({uiSchema: safeLoad(uiSchema)});
    } catch (e) {
      console.log(e);
    }
  };

  handleSubmit = () => {
    this.setState({data: this.form.value});
  };
  handleValid = () => {
    this.form.isValid;
  };

  render() {
    const {schema, uiSchema, data} = this.state;

    return (
      <div>
        <SchemaEditor
          value={dump(schema)}
          onChange={this.handlerSchemaChange}
        />
        <SchemaEditor
          value={dump(uiSchema)}
          onChange={this.handlerUISchemaChange}
        />
        <div style={{float: 'left', width: 500, height: 500, overflow: 'auto'}}>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            ref={c => {
              this.form = c;
            }}
            formData={data}
          />
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              type="primary"
              onClick={this.handleSubmit}
              style={{marginRight: '10px'}}
            >
              Submit
            </Button>
            <Button type="primary" onClick={this.handleValid}>
              Valid
            </Button>
          </div>
        </div>
        <ObjectInspector data={data} />
      </div>
    );
  }
}
