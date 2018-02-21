import React from 'react';
import PropTypes from 'prop-types';
import style from '../styles/magneticScroll.css';

const MagneticPage = ({ children }) => (
  <div>
    {children}
  </div>
);

MagneticPage.propTypes = {
  children: PropTypes.node.isRequired
};

export default MagneticPage;
