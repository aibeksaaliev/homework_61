import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {CountryDetailsType} from "../../types";
import './CountryInfo.css';

interface CountryInfoProps {
  code: string | null;
}

const COUNTRY_INFO_URL = "https://restcountries.com/v2/alpha/";


const CountryInfo: React.FC<CountryInfoProps> = ({code}) => {
  const [countryInfo, setCountryInfo] = useState<CountryDetailsType.RootObject | null>(null);
  const [borders, setBorders] = useState<CountryDetailsType.RootObject [] | null>(null);

  const fetchCountryInfo = useCallback(async (code: string) => {
    const countryResponse = await axios.get<CountryDetailsType.RootObject>(COUNTRY_INFO_URL + code);
    setCountryInfo(countryResponse.data);

    if (countryResponse.data.borders) {
      const promises = countryResponse.data.borders.map( async (border) => {
        const borderResponse = await axios.get<CountryDetailsType.RootObject>(COUNTRY_INFO_URL + border);
        return borderResponse.data;
      });

      const bordersInfo = await Promise.all(promises);
      setBorders(bordersInfo);
    } else {
      setBorders(null);
    }

  }, [])

  useEffect(() => {
    if (code !== null) {
      fetchCountryInfo(code).catch(console.error);
    }
  }, [code, fetchCountryInfo])

  return countryInfo ? (
    <div className="country_info">
      <div className="country_info_box">
        <div className="country_details">
          <span>Country: {countryInfo?.name}.</span>
          <span>Capital: {countryInfo?.capital}.</span>
          <span>Population: {countryInfo?.population}.</span>
          <span>Region: {countryInfo?.region}.</span>
          <span>Subregion: {countryInfo?.subregion}.</span>
          <span>Native name: {countryInfo?.nativeName}.</span>
        </div>
        <div className="flag_box">
          <img src={countryInfo?.flag} alt=""/>
        </div>
      </div>
      <div>
        {borders ? borders.map( border => {
          return <span style={{display: "block"}} key={border.alpha3Code}>{border.name}</span>
        }) : null}
      </div>
    </div>
  ) : (
    <div className="country_info">
      <p>Please, select a country.</p>
    </div>
  );
};

export default CountryInfo;