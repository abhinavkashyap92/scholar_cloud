import React, {Component} from 'react';
import './app.css';
import Main from '../main/main';


/**
 * The entry point to the entire application.
 * It renders the `<Main/>` Component and is not expected to do anything else.
 */
class App extends Component {
/**
* render - Renders the <App> Component of the application.
*
* @return {string}  Renders the <Main/> component of the application.
*/
  render() {
    return (
      <Main/>
    );
  }
}

export default App;
