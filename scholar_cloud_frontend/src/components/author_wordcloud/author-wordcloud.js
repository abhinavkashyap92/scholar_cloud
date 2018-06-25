import React, {Component} from 'react';
import './author-wordcloud.css';
import SearchBar from './search_bar/search-bar';
import YearSlider from './slider/slider';
import WordCloud from './wordcloud/wordcloud';
import getAuthors from '../../services/get_authors';
import getActiveYears from '../../services/active_years';
import getWordCloud from '../../services/word_cloud';

const style = {'width': 400, 'margin': 50};

/**
 * Top Level Component that wraps other components of the page.
 */
class AuthorWordCloud extends Component {
  /**
    * constructor - description
    *
    * @param  {type} props description
    */
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      authorIdNameMapping: [],
      authorId: '',
      startYear: 0,
      endYear: 0,
      minYear: null,
      maxYear: null,
      topWords: [],
      initialAuthorName: null,
      isAuthorChanged: true,
    };

    this.wordCountKey = 'value';
    this.wordKey = 'word';

    this.handleNameSelected = this.handleNameSelected.bind(this);
    this.handleYearSelected = this.handleYearSelected.bind(this);
    this.getAuthors = this.getAuthors.bind(this);
  }


  /**
    * render - render method for AuthorWordCloud
    * @return {str}  AuthorWordCloud container Component
    */
  render() {
    let searchBarComponent;
    let sliderComponent;


    /**
      * Check whether the initial author name has been obtained from the
      * async call. Render the SearchBar only when this is available.
      * This is to make sure that there is some initial value before
      * the user starts interacting.
      */
    if (this.state.initialAuthorName !== null &&
        this.state.authorIdNameMapping.length !== 0) {
      searchBarComponent = <SearchBar
        authors={this.state.authorIdNameMapping}
        onAuthorSelected={this.handleNameSelected}
        initialAuthorName={this.state.initialAuthorName}
      />;
    } else {
      searchBarComponent = null;
    }


    if (this.state.minYear !== null && this.state.maxYear !== null) {
      sliderComponent = <YearSlider
      onYearSelected={this.handleYearSelected}
      minYear={this.state.minYear}
      maxYear={this.state.maxYear}
      initialStartYear={this.state.minYear}
      initialEndYear={this.state.maxYear}
      isAuthorChanged={this.state.isAuthorChanged}
    />;
    } else {
      sliderComponent = null;
    }


    return (
      <div className="word-cloud-wrapper">
        <div className="search-bar-component">
          <h1 className="title has-text-centered">
            Author Name
          </h1>
          <h2 className="subtitle has-text-centered">
            Start Typing a letter
          </h2>
          <div>
          {searchBarComponent}
          </div>
        </div>
        <div>
        <hr className="line-break"/>
        </div>
        <div style={style} className="slider-component">
          <h1 className="title">Year</h1>
          <h2 className="subtitle">You can move the left and the
          right slider to change the year</h2>
          {sliderComponent}
          <span className="years-published-heading">Year Published:</span>
          <span> {this.state.minYear}</span>
          - <span>{this.state.maxYear}</span>
        </div>
        <div className="wordcloud-wrapper">
          <h1 className="title">
            Wordcloud
          </h1>
          <h2 className="subtitle wordcloud-information">
            This word cloud shows the importance of words gathered
            from the paper titles of the scholar. The importance
            is calculated using TF-IDF.
          </h2>
          <WordCloud
            top_words={this.state.topWords}
            wordCountKey={this.wordCountKey}
            wordKey={this.wordKey}
          />
        </div>
      </div>
    );
  }

  /**
    * componentDidMount - Called after the Component Mounts in the DOM
    */
  componentDidMount() {
    let that = this;

    /**
      * A series of three API Calls one after the other
      * 1. Get all the authors
      * 2. Get the default authors from year and to year
      * 3. Get the word cloud for the entire time of the author initially
      */

    this
    .getAuthors()
    .then(() => {
      that.getActiveYears()
      .then(() => {
        that.getWordCloud();
      });
    });
  }

  /**
    * getAuthors - Get all the authors from the database
    */
  async getAuthors() {
    const authors = await getAuthors();
    let deafultAuthorId = authors[0]['id'];
    let defaultAuthorName = authors[0]['name'];

    this.setState({
      authorIdNameMapping: authors,
      authorId: deafultAuthorId,
      initialAuthorName: defaultAuthorName,
    });
  }

  /**
    * getActiveyears - Get all the authors from the database
    */
  async getActiveYears() {
    let activeYears = await getActiveYears(this.state.authorId);
    let fromYear = activeYears['from_year'];
    let toYear = activeYears['to_year'];
    this.setState({
      startYear: fromYear,
      endYear: toYear,
      minYear: fromYear,
      maxYear: toYear,
    });
  }

  /**
    * getWordCloud - Get all the word cloud for the authors
    * @param {str} authorID - Author id
    * @param {str} fromYear
    * @param {str} toYear
    */
  async getWordCloud(authorID, fromYear, toYear) {
    let wordCloud = await getWordCloud(this.state.authorId,
                                       this.state.startYear,
                                       this.state.endYear);
    this.setState({
      topWords: wordCloud,
    });
  }


  /**
    * handleNameSelected - A new author has been selected
    * Get the word cloud for him
    * @param {str} id - Id of the author selected
    */
  handleNameSelected(id) {
    let that = this;
    console.log('new author selected');
    console.log('id of the author selected', id);
    this.setState({
      authorId: id,
      isAuthorChanged: true,
    }, () => {
      that.getActiveYears(id)
      .then(() => {
        that.getWordCloud();
      });
    });
  }

  /**
    * handleYearSelected - A new set of dates have been selected
    * Get the word cloud for the current author
    * @param {number} fromYear - from year selected in the range
    * @param {number} toYear - to year selected in the range
    */
  handleYearSelected(fromYear, toYear) {
    let that = this;
    console.log('new date has been selected');
    console.log('from year', fromYear);
    console.log('to year', toYear);
    console.log('author ID in handleYearSelected', that.state.authorId);
    this.setState({
      startYear: fromYear,
      endYear: toYear,
      isAuthorChanged: false,
    }, () => {
      that.getWordCloud(this.state.authorID, fromYear, toYear);
    });
  }
}

export default AuthorWordCloud;
