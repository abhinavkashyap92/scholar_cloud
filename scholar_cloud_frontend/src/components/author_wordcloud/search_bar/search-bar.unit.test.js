import React from 'react';
import SearchBar from './search-bar';
import {mount} from 'enzyme';


describe('Search Bar Component Test ', () => {
  let searchBarComponent;

  const getComponent = () => {
    if (!searchBarComponent) {
      searchBarComponent = mount(<SearchBar
      initialAuthorName="User1"/>);
    }
    return searchBarComponent;
  };

  it('needs to have a single component', () => {
    let searchBarComponent = getComponent();
    expect(searchBarComponent.children()).toHaveLength(1);
  });

  it('set the state.value to the prop that is passed', () => {
    let searchBarComponent = getComponent();
    expect(searchBarComponent.state().value)
    .toMatch(searchBarComponent.props().initialAuthorName);
  });
});
