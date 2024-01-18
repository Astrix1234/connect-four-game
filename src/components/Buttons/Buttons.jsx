import React from 'react';
import scss from './Buttons.module.scss';
import PropTypes from 'prop-types';

export const Buttons = ({ text, icon, classes, onClick }) => {
  return (
    <>
      <button className={`${scss.button} ${classes}`} onClick={onClick}>
        <span>{text} </span>
        <span>{icon}</span>
      </button>
    </>
  );
};

Buttons.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element,
  classes: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
