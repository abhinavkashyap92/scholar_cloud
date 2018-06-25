import React, {Component} from 'react';
import './wordcloud.css';
import ReactWordCloud from 'react-wordcloud';


/**
  * Displays the wordcloud for the author
  */
class WordCloud extends Component {
  /**
    * render
    *
    * @return {str}
    */
  render() {
    return (
      <div>
        <ReactWordCloud
          words={this.props.top_words}
          wordCountKey={this.props.wordCountKey}
          wordKey={this.props.wordKey}
        />
      </div>
    );
  }
}

export default WordCloud;
