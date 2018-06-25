import React from 'react';
import {Switch} from 'react-router-dom';
import Main from '../main/main';
import {mountWrap} from '../../utils/test-utils';

describe('Main Component', () => {
  let mainComponent;

  const getMainComponent = () => {
    if (!mainComponent) {
      mainComponent = mountWrap(<Main></Main>);
    }
    return mainComponent;
  };

  it('should always have one Switch Component', () => {
    let component = getMainComponent();
    expect(component.find(Switch)).toHaveLength(1);
  });
});
