import React from 'react';
import App from './app';
import Main from '../main/main';
import {mountWrap} from '../../utils/test-utils';

describe('App Tests', () => {
  let appComponent;
  const getAppComponent = () => {
    if (!appComponent) {
      appComponent = mountWrap(
        <App></App>
      );
    }
    return appComponent;
  };


  // App should return only one Component
  it('always renders one component only', () => {
    const appComponent = getAppComponent();
    expect(appComponent.children()).toHaveLength(1);
  });

  // App should return the Main Component
  it('always renders a Main', () => {
    const mainComponent = getAppComponent().find(Main);
    expect(mainComponent).toHaveLength(1);
  });
});
