import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {CountryDetailsType} from "../../types";

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
    }

  }, [])

  useEffect(() => {
    if (code !== null) {
      fetchCountryInfo(code).catch(console.error);
    }
  }, [code, fetchCountryInfo])

  return (
    <div>
      <p>{countryInfo?.name}</p>
      <p>{countryInfo?.capital}</p>
      <p>{countryInfo?.population}</p>
      <div>
        {borders ? borders.map( border => {
          return <span style={{display: "block"}} key={border.alpha3Code}>{border.name}</span>
        }) : null}
      </div>
    </div>
  );
};

export default CountryInfo;