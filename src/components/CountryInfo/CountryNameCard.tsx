import React from 'react';

interface CountryNameCardProps {
  countryName: string;
}

const CountryNameCard: React.FC<CountryNameCardProps> = ({countryName}) => {
  return (
    <div>
      <span>{countryName}</span>
    </div>
  );
};

export default CountryNameCard;