import {isEmpty} from 'lodash';
import * as React from 'react';

import {IWidget} from '../../../typings/IWidget';
import Errors from '../../components/Errors';
import validator from '../../Validator';

import Range from './components/Range';

interface TRangeWidgetState {
  value?: number[] | undefined | null;
  errors: any[];
}

export default class RangeWidget extends React.Component<
  IWidget,
  TRangeWidgetState
> {
  constructor(props) {
    super(props);

    const {
      value,
      schema: {properties},
      uiSchema: {
        'ui:options': {minKey, maxKey},
      },
    } = props;

    if (!isEmpty(value)) {
      this.state = {
        errors: [],
        value: [value[minKey], value[maxKey]],
      };
    } else {
      this.state = {
        errors: [],
        value: [
          properties[minKey].default || properties[minKey].minimum,
          properties[maxKey].default || properties[maxKey].maximum,
        ],
      };
    }
  }

  public get value(): object {
    const {value} = this.state;

    return {
      [this.props.uiSchema['ui:options'].minKey]: value[0],
      [this.props.uiSchema['ui:options'].maxKey]: value[1],
    };
  }

  public get isValid(): boolean {
    const {schema} = this.props;
    const errors = [];

    validator.validate(schema, this.value);

    if (validator.errors) {
      errors.push(...validator.errors);
    }

    this.setState({errors});

    return errors.length === 0;
  }

  public render() {
    const {
      schema: {properties},
      uiSchema: {
        'ui:options': {minKey, maxKey},
      },
    } = this.props;

    return (
      <React.Fragment>
        <Errors errors={this.state.errors} />
        <Range
          onChange={this.handleChange}
          value={this.state.value}
          min={properties[minKey].minimum}
          max={properties[maxKey].maximum}
        />
      </React.Fragment>
    );
  }

  private handleChange = (value: number[]): void => {
    this.setState({value});
  };
}
