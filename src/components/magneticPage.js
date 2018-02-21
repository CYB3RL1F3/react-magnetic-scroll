import React from 'react';
import PropTypes from 'prop-types';

class MagneticPage extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onScrollUpStart: PropTypes.func,
    onScrollUpEnd: PropTypes.func,
    onScrollDownStart: PropTypes.func,
    onScrollDownEnd: PropTypes.func,
    id: PropTypes.string.isRequired,
  }

  static defaultProps = {
    onScrollUpStart: () => {},
    onScrollUpEnd: () => {},
    onScrollDownStart: () => {},
    onScrollDownEnd: () => {},
  }

  constructor(props) {
    super(props);
    if (!this.props.id) {
      throw new Error('Magnetic page property ID is required');
    }
  }

  // hooks executors
  onScrollUpStart = () => this.props.onScrollUpStart()
  onScrollUpEnd = () => this.props.onScrollUpEnd()
  onScrollDownStart = () => this.props.onScrollDownStart()
  onScrollDownEnd = () => this.props.onScrollDownEnd()

  render = () => this.props.children
}

export default MagneticPage;
