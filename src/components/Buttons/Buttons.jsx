import React from 'react';
import scss from './Buttons.module.scss';

export const Buttons = ({ text, icon, classes, onClick }) => {
  return (
    <>
      <button
        className={`${scss.button} ${classes}`}
        onClick={onClick}
      >{`${text} ${icon}}`}</button>
    </>
  );
};
