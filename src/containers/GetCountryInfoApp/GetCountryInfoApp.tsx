import React, {useCallback, useEffect, useState} from 'react';
import CountryList from "../../components/CountryList/CountryList";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import axios from "axios";
import {CountryType} from "../../types";

const COUNTRY_LIST_URL = "https://restcountries.com/v2/all?fields=alpha3Code,name";

const GetCountryInfoApp = () => {
  const [countriesList, setCountriesList] = useState<CountryType[]>([]);
  const [clickedCountryCode, setClickedCountryCode] = useState<string | null>(null);

  const fetchCountriesList = useCallback(async () => {
    const countriesListResponse = await axios.get<CountryType[]>(COUNTRY_LIST_URL);
    setCountriesList(countriesListResponse.data);
  }, []);

  useEffect(() => {
    fetchCountriesList().catch(console.error);
  }, [fetchCountriesList])

  return (
    <div style={{display: "flex"}}>
      <CountryList countries={countriesList} selectCountry={setClickedCountryCode}/>
      <CountryInfo code={clickedCountryCode}/>
    </div>
  );
};

export default GetCountryInfoApp;