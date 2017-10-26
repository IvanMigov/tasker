import React from 'react';
import logoNormal from '../images/status/normal.png';
import logoHigh from '../images/status/major.svg';
import logoLow from '../images/status/minor.svg';

export const getImgPriority = (priority)=>{
  let logoImg = logoNormal;
  switch (priority) {
    case  'low':
      logoImg = logoLow;
      break;
    case  'high':
      logoImg = logoHigh;
      break;
    default:
      logoImg = logoNormal;
  }

  return (
    <img src={logoImg} alt="priority"/>
  );

};
export const getColorStatus = (status)=>{
  let backgroundColor = '#bfe4ff';//status == todo
  switch (status) {
    case  'InProgress':
      backgroundColor = '#0c0e75';
      break;
    case  'Closed':
      backgroundColor = '#1d750c';
      break;
    default:
      backgroundColor = '#bfe4ff';
  }

  return {backgroundColor}

};