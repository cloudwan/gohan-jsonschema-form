import * as React from 'react';

import {Slider} from 'antd';

import 'antd/lib/slider/style';

export const Range = props => <Slider range={true} {...props} />;

export default Range;
