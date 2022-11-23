import React from 'react';
import {CountryType} from "../../types";
import CountryNameCard from "../CountryInfo/CountryNameCard";

interface CountryListProps {
  countries: CountryType [];
  selectCountry: (alpha3Code: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({countries, selectCountry}) => {
  return (
    <div>
      {countries.map(country => {
        return <CountryNameCard
          key={country.alpha3Code}
          countryName={country.name}
          onClickCountryName={() => selectCountry(country.alpha3Code)}
        />
      })}
    </div>
  );
};

export default CountryList;