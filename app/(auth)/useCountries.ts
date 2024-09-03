import { supabase } from '../../supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const COUNTRIES_STORAGE_KEY = 'app_countries';

const fetchCountriesFromSupabase = async (): Promise<string[]> => {
  console.log('Fetching countries from Supabase...');
  const { data, error } = await supabase
    .from('reg_Country')
    .select('country_name')
    .order('country_name', { ascending: true });

  if (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Error fetching countries: ' + error.message);
  }

  console.log('Raw data from Supabase:', data);
  const countryNames = data.map(country => country.country_name);
  console.log('Processed country names:', countryNames);

  return countryNames;
};

export const useCountries = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      console.log('useCountries hook effect running...');
      try {
        // Clear AsyncStorage to force a fetch from Supabase
        await AsyncStorage.removeItem(COUNTRIES_STORAGE_KEY);
        console.log('AsyncStorage cleared');

        const storedCountries = await AsyncStorage.getItem(COUNTRIES_STORAGE_KEY);
        
        if (storedCountries) {
          console.log('Countries found in AsyncStorage:', storedCountries);
          const parsedCountries = JSON.parse(storedCountries);
          console.log('Parsed countries from AsyncStorage:', parsedCountries);
          setCountries(parsedCountries);
          setIsLoading(false);
        } else {
          console.log('No countries in AsyncStorage, fetching from Supabase');
          const fetchedCountries = await fetchCountriesFromSupabase();
          console.log('Countries fetched from Supabase:', fetchedCountries);
          setCountries(fetchedCountries);
          await AsyncStorage.setItem(COUNTRIES_STORAGE_KEY, JSON.stringify(fetchedCountries));
          console.log('Countries stored in AsyncStorage');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error in useCountries hook:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  console.log('useCountries hook returning:', { countriesCount: countries.length, isLoading, error });
  return { countries, isLoading, error };
};