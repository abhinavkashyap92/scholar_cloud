import React from 'react';
import AuthorWordCloud from './author-wordcloud';
import SearchBar from './search_bar/search-bar';
import YearSlider from './slider/slider';
import {shallow} from 'enzyme';

jest.mock('../../services/get_authors.js');
jest.mock('../../services/active_years.js');
jest.mock('../../services/word_cloud.js');


describe('AuthorWordCloud tests', () => {
  let authorWordCloudComponent;

  const getComponent = () => {
    if (!authorWordCloudComponent) {
      authorWordCloudComponent = shallow(<AuthorWordCloud/>);
    }
    return authorWordCloudComponent;
  };


  it('renders a single outer div', (done) => {
    let authorWordCloudComponent = getComponent();

    setTimeout(() => {
      authorWordCloudComponent.update();
      expect(authorWordCloudComponent.find('div').length).toBeGreaterThan(0);
      done();
    });
  });


  it('renders a SearchBar Component', (done) => {
    let authorWordCloudComponent = getComponent();
    setTimeout(() => {
      authorWordCloudComponent.update();
      expect(authorWordCloudComponent.find(SearchBar).length).toBe(1);
      done();
    });
  });


  it('SearchBar Component always receives props', (done) => {
    let authorWordCloudComponent = getComponent();
    setTimeout(() => {
      authorWordCloudComponent.update();
      let searchBarProps =Object.keys(
        authorWordCloudComponent.find(SearchBar).props()
      );
      expect(searchBarProps.length).toBeGreaterThan(0);
      done();
    });
  });


  it('renders a YearSlider component', (done) => {
    let authorWordCloudComponent = getComponent();
    setTimeout(() => {
      authorWordCloudComponent.update();
      expect(authorWordCloudComponent.find(YearSlider).length).toBe(1);
      done();
    });
  });


  it('YearSlider always receives props', (done) => {
    let authorWordCloudComponent = getComponent();
    setTimeout(() => {
      authorWordCloudComponent.update();
      let yearSliderProps = Object.keys(
        authorWordCloudComponent.find(YearSlider).props()
      );
      expect(yearSliderProps.length).toBeGreaterThan(1);
      done();
    });
  });


  it('YearSlider has props minYear from state', (done) => {
    let authorWordCloudComponent = getComponent();
    setTimeout(() => {
      authorWordCloudComponent.update();
      expect(authorWordCloudComponent
        .find(YearSlider)
        .props()['minYear'])
        .toEqual(authorWordCloudComponent.state()['minYear']);
      done();
    });
  });


  it('YearSlider has props maxYear from state', (done) => {
    let authorWordCloudComponent = getComponent();
    setTimeout(() => {
      authorWordCloudComponent.update();
      expect(authorWordCloudComponent
        .find(YearSlider)
        .props()['maxYear'])
        .toEqual(authorWordCloudComponent.state()['maxYear']);
      done();
    });
  });


  it('YearSlider has props initialStartYear from state', (done) => {
    let authorWordCloudComponent = getComponent();
    setTimeout(() => {
      authorWordCloudComponent.update();
      expect(authorWordCloudComponent
        .find(YearSlider)
        .props()['initialStartYear'])
        .toEqual(authorWordCloudComponent.state()['minYear']);
      done();
    });
  });


  it('YearSlider has props initialEndYear from state', (done) => {
    let authorWordCloudComponent = getComponent();
    setTimeout(() => {
      authorWordCloudComponent.update();
      expect(authorWordCloudComponent
        .find(YearSlider)
        .props()['initialEndYear'])
        .toEqual(authorWordCloudComponent.state()['maxYear']);
      done();
    });
  });
});
