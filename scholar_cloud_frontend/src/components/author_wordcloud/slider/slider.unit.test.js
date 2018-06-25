import React from 'react';
import YearSlider from './slider';
import {mount} from 'enzyme';
import {Range} from 'rc-slider';

describe('Slider  Component Test', () => {
  let slider;
  let props;

  let getSlider = () => {
    if (!slider) {
      slider = mount(<YearSlider {...props}/>);
    }
    return slider;
  };

  beforeEach(() => {
    props = {
      initialStartYear: 2010,
      initialEndYear: 2012,
      isAuthorChanged: false,
      onYearSelected: undefined,
      minYear: 10,
      maxYear: 20,
    };
    slider = undefined;
  });

  it('it should always render the Range Slider', () => {
    let slider = getSlider();
    expect(slider.find(Range)).toHaveLength(1);
  });

  it('the minYear should be passed to the Range Slider', () => {
    let slider = getSlider();
    expect(slider.find(Range).props()['min']).toBe(props.minYear);
  });

  it('The maxYear should be passed to the range slider', () => {
    let slider = getSlider();
    expect(slider.find(Range).props()['max']).toBe(props.maxYear);
  });

  it('if state.value has length=0 check for value of the range slider', () => {
    let slider = getSlider();
    expect(slider.find(Range).props()['value'])
    .toEqual(
     expect.arrayContaining([props.initialStartYear, props.initialEndYear])
    );
    });


  describe('when the isAuthorChanged', () => {
    beforeEach(() => {
      props.isAuthorChanged = true;
    });

    it('if isAuthorChanged then check for value of the range slider', () => {
      let slider = getSlider();
      expect(slider.find(Range).props()['value'])
      .toEqual(
        expect.arrayContaining([props.initialStartYear, props.initialEndYear])
      );
    });
  });
});
