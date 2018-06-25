import {BrowserRouter} from 'react-router-dom';
import {mount, shallow} from 'enzyme';
import PropTypes from 'prop-types';
// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: {router},
  childContextTypes: {router: PropTypes.shape({})},
});


/**
* mountWrap - Normal mount does not work with
* nodes that are wrapped in Router from React
* This provides a wrapper around it that works
* with components wrapper in React Router.
* @param  {React.Component} node Any React.Component
* @return {Enzyme.ReactWrapper} ReactWrapper - same as Enzyme
*/
function mountWrap(node) {
  return mount(node, createContext());
}

/**
* shallowWrap - Normal mount does not work with
* nodes that are wrapped in Router from React
* This provides a wrapper around it that works
* with components wrapper in React Router.
* @param  {React.Component} node Any React.Component
* @return {Enzyme.ReactWrapper} ReactWrapper - same as Enzyme
*/
function shallowWrap(node) {
  return shallow(node, createContext());
}

export {
  mountWrap,
  shallowWrap,
};
