import React from 'react';
import './CountryNameCard.css';


interface CountryNameCardProps {
  countryName: string;
  onClickCountryName: React.MouseEventHandler;
}

const CountryNameCard: React.FC<CountryNameCardProps> = ({countryName, onClickCountryName}) => {
  return (
    <div
      className="country_name"
      onClick={onClickCountryName}>
      <span>{countryName}</span>
    </div>
  );
};

export default CountryNameCard;