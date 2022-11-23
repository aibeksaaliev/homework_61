import React from 'react';

interface CountryNameCardProps {
  countryName: string;
  onClickCountryName: React.MouseEventHandler;
}

const CountryNameCard: React.FC<CountryNameCardProps> = ({countryName, onClickCountryName}) => {
  return (
    <div onClick={onClickCountryName}>
      <span>{countryName}</span>
    </div>
  );
};

export default CountryNameCard;