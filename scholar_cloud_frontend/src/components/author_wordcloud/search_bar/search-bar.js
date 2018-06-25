import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import './search-bar.css';

/**
  *  * Search Bar Component helps you search for different authors.
  *  * Start typing a letter, and this suggests the different authors.
  *
  */
class SearchBar extends Component {
  /**
    * constructor - description
    *
    * @param  {type} props description
    */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: props.initialAuthorName,
      suggestions: [],
    };
    this.onChange = this.onChange.bind(this);
    this.getSuggestion = this.getSuggestion.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);

    this.onSuggestionsFetchRequested =
    this.onSuggestionsFetchRequested.bind(this);

    this.onSuggestionsClearRequested =
    this.onSuggestionsClearRequested.bind(this);
  }


  /**
    * render
    *
    * @return {str}
    */
  render() {
    let {value, suggestions} = this.state;

    const inputProps = {
      placeholder: 'Start typing a letter',
      value,
      onChange: this.onChange,
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
      />
    );
  }


  /**
    * onChange - called when the user entered input changes
    *
    * @param  {object} event Captures information about the event
    * @param  {str} {newValue}  The new value that is entered by the user
    */
  onChange(event, {newValue}) {
    this.setState({
      value: newValue,
    });
  }


  /**
    * getSuggestion - Which suggestions to consider when the user inputs the
    * value in the textbox
    * @param  {object} value Value entered in the text box
    * @return {array} List of objects containing suggestion
    */
  getSuggestion(value) {
    const valueEntered = value.value;
    const inputValue = valueEntered.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.authors.filter((author) =>
      author.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }


  /**
    * getSuggestionValue - The value inside the suggestion to be used
    * to display
    * @param  {object} suggestion one of the suggestions chosen
    * @return {str} Value to be displayed to the user
    */
  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  /**
    * renderSuggestion - You can decide how the suggestion is rendered.
    * to display
    * @param  {object} suggestion one of the suggestions chosen
    * @return {str} A JSX describing how the suggestion is shown.
    */
  renderSuggestion(suggestion) {
    return (
      <div>
        {suggestion.name}
      </div>
    );
  }

  /**
    * onSuggestionsFetchRequested - Library calls this method everytime
    * suggestions need to be adjusted.
    * @param  {str} value Value entered in the textbox
    */
  onSuggestionsFetchRequested(value) {
    let that = this;
    this.setState({
      suggestions: that.getSuggestion(value),
    });
  }

  /**
    * onSuggestionsClearRequested - Library calls this method everytime
    * suggestions need to be cleared.
    */
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }


  /**
    * onSuggestionSelected - When a suggestion is clicked, the value is obtained
    * @param {object} event - Captures information about the event
    * @param {object} suggestion - A suggestion object
    */
  onSuggestionSelected(event, {suggestion}) {
    this.props.onAuthorSelected(suggestion.id);
  }
};

export default SearchBar;
