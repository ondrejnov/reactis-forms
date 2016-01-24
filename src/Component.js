import React from 'react';
import shallowEqual from 'react-pure-render/shallowEqual';

/**
 * Purified React.Component. Goodness.
 * http://facebook.github.io/react/docs/advanced-performance.html
 */
class Component extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {

    const shouldUpdate =
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState);


    return shouldUpdate;
  }

}

export default Component;
