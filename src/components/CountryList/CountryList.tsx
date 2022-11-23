import React from 'react';
import {CountryType} from "../../types";
import CountryNameCard from "../CountryInfo/CountryNameCard";

interface CountryListProps {
  countries: CountryType [];
}

const CountryList: React.FC<CountryListProps> = ({countries}) => {
  return (
    <div>
      {countries.map(country => {
        return <CountryNameCard key={country.alpha3Code} countryName={country.name}/>
      })}
    </div>
  );
};

export default CountryList;