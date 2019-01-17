import {FieldArrayRenderProps, getIn} from 'formik';
import {JSONSchema4} from 'json-schema';
import * as React from 'react';

import {IWidget} from '../../../../typings/IWidget';
import SchemaField from '../../../fields/SchemaField';
import ListAddButton from './ListAddButton';
import ListItem from './ListItem';

import styles from './List.css';

interface TListProps {
  children: React.ReactNode;
}

class List extends React.Component<FieldArrayRenderProps & IWidget> {
  public render() {
    const {form, name, schema} = this.props;

    const fieldValue = getIn(form.values, name);

    return (
      <React.Fragment>
        <ListAddButton onClick={this.handleAddClick} />
        <ul className={styles.listContainer}>
          {fieldValue &&
            fieldValue.map((value, index) => (
              <ListItem
                index={index}
                key={`${name}.${index}`}
                itemsCount={fieldValue.length}
                onMoveUpButtonClick={this.handleReorderClick(index, index - 1)}
                onMoveDownButtonClick={this.handleReorderClick(
                  index,
                  index + 1,
                )}
                onRemoveButtonClick={this.handleRemoveClick(index)}
              >
                <SchemaField id={`${name}.${index}`} schema={schema.items} />
              </ListItem>
            ))}
        </ul>
      </React.Fragment>
    );
  }

  private handleAddClick = (): void => {
    const items = this.props.schema.items as JSONSchema4;
    this.props.push(items.default);
  };

  private handleReorderClick = (indexA: number, indexB: number) => () => {
    this.props.swap(indexA, indexB);
  };

  private handleRemoveClick = (index: number) => () => {
    this.props.remove(index);
  };
}

export default List;
