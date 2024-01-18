import React from 'react';
import scss from './Buttons.module.scss';
import propTypes from 'prop-types';

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
  text: propTypes.string.isRequired,
  icon: propTypes.string,
  classes: propTypes.string,
  onClick: propTypes.func.isRequired,
};
