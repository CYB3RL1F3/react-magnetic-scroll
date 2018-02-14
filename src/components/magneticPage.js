import React from 'react';
import PropTypes from 'prop-types';
import style from '../styles/magneticScroll.css';

const MagneticPage = ({ page, pageHeight }) => (
  <div className={style.page} style={{ height: pageHeight }}>
    {page}
  </div>
);

MagneticPage.propTypes = {
  page: PropTypes.number.isRequired,
  pageHeight: PropTypes.number.isRequired,
};

export default MagneticPage;
