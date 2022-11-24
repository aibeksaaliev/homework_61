import React, {useCallback, useEffect, useState} from 'react';
import CountryList from "../../components/CountryList/CountryList";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import axios from "axios";
import {CountryType} from "../../types";
import './GetCountryInfoApp.css';

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
    <div className="container main_app">
      <CountryInfo code={clickedCountryCode}/>
      <CountryList countries={countriesList} selectCountry={setClickedCountryCode}/>
    </div>
  );
};

export default GetCountryInfoApp;