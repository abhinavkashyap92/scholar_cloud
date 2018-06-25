import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import './main.css';
import AuthorWordCloud from '../author_wordcloud/author-wordcloud';


/**
 * `<Main>` Component re-directs the different routes
 * to the appropriate components. The `<Main>` Component
 * is not expected to do anything else.
 *
 * **NOTE**: Please do not change this component unless you are adding
 * a new route to the application.
 */
class Main extends Component {
/**
* render - renders a Switch Component that
* re-directs the different routes to the appropriate component.
* @return {string} - Returns the Switch that contains other routes.
*/
  render() {
    return (
      <div>
        <section className="hero is-info is-large is-bold">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                Scholar Cloud
              </h1>
              <h2 className="subtitle">
                Visualise paper titles over time.
              </h2>
            </div>
          </div>
        </section>
        <Switch>
          <Route exact path="/" component={AuthorWordCloud}></Route>
        </Switch>
      </div>
    );
  }
}

export default Main;
