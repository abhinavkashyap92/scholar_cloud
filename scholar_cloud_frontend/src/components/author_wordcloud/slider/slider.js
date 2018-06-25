import React, {Component} from 'react';
import './slider.css';
import 'rc-slider/assets/index.css';
const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


/**
  * This helps you to select the year by using a slider
  */
class YearSlider extends Component {
  /**
   * constructor - Constructor for props;
   * @param {obj} props Props passed to the component
   */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: [this.props.initialStartYear, this.props.initialEndYear],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAfterChange=this.handleAfterChange.bind(this);
  }

  /**
   * constructor - Constructor for props;
   * @param {array} value Value passed after change
   */
  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  /**
   * constructor - Constructor for props;
   * @param {array} value Value passed after change
   */
  handleAfterChange(value) {
    this.props.onYearSelected(value[0], value[1]);
  }


  /**
   * render - render method for the slider that helps user chose range of years
   *
   * @return {str}  Returns the Slider Component from the library
   */
  render() {
    let value = this.state.value;
    if (this.props.isAuthorChanged || this.state.value.length === 0) {
      value = [this.props.initialStartYear, this.props.initialEndYear];
    }

    return (<Range
      value={value}
      onChange={this.handleChange}
      allowCross={false}
      min={this.props.minYear}
      max={this.props.maxYear}
      onAfterChange={this.handleAfterChange}
      {...this.props}
    />);
  }
}

export default YearSlider;
