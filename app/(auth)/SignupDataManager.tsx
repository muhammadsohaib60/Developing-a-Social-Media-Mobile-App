import { supabase } from '../../supabaseClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';

interface Country {
  callingCode: string[];
  cca2: string;
  currency: string[];
  flag: string;
  name: string;
  region: string;
  subregion: string;
}

interface LocationData {
  country: Country;
  state: string;
  localGovernment: string;
  neighborhood: string;
}

interface CountrySpecificData {
  churches: string[];
  ethnicGroups: string[];
  politicalParties: string[];
  sportsClubs: string[];
  universities: string[];
}

interface RegionalData {
    states: any[];
    localGovernments: any[];
    neighborhoods: any[];
  }
interface SignupData {
  location: LocationData | null;
  countrySpecificData: CountrySpecificData | null;
  regionalData: RegionalData | null;
}

class SignupDataManager {
  private static instance: SignupDataManager;
  private signupData: SignupData = {
    location: null,
    countrySpecificData: null,
    regionalData: null,
  };
  private countries: string[] = [];
  private session: Session | null = null;

  private constructor() {}

  public static getInstance(): SignupDataManager {
    if (!SignupDataManager.instance) {
      SignupDataManager.instance = new SignupDataManager();
    }
    return SignupDataManager.instance;
  }

  async setSession(session: Session): Promise<void> {
    console.log("Setting session in SignupDataManager:", session);
    this.session = session;
  }

  getSession(): Session | null {
    return this.session;
  }

  async fetchCountries(): Promise<string[]> {
    if (this.countries.length > 0) {
      return this.countries;
    }

    try {
      const { data, error } = await supabase
        .from('reg_Country')
        .select('country_name')
        .order('country_name', { ascending: true });

      if (error) throw error;

      this.countries = data.map(country => country.country_name);
      return this.countries;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }

  async setLocationData(data: LocationData): Promise<void> {
    this.signupData.location = data;
    await this.saveSignupData();
  }

  getLocationData(): LocationData | null {
    return this.signupData.location;
  }

  async fetchCountrySpecificData(countryName: string): Promise<CountrySpecificData> {
    console.log(`Fetching country-specific data for: ${countryName}`);
    try {
      const { data: countryData, error: countryError } = await supabase
        .from('reg_Country')
        .select('country_name')
        .eq('country_name', countryName)
        .single();

      if (countryError || !countryData) {
        console.error(`Country "${countryName}" not found in the database:`, countryError);
        throw new Error(`Country "${countryName}" not found in the database`);
      }

      const [churches, ethnicGroups, politicalParties, sportsClubs, universities] = await Promise.all([
        this.fetchDataFromTable('reg_churches', 'church_name', countryName),
        this.fetchDataFromTable('ethnic_groups', 'ethnic_name', countryName),
        this.fetchDataFromTable('political_parties', 'party_name', countryName),
        this.fetchDataFromTable('reg_sports_club', 'club_name', countryName),
        this.fetchDataFromTable('reg_universities', 'uni_name', countryName)
      ]);

      const countrySpecificData: CountrySpecificData = {
        churches,
        ethnicGroups,
        politicalParties,
        sportsClubs,
        universities
      };

      console.log('Fetched country-specific data:', countrySpecificData);

      this.signupData.countrySpecificData = countrySpecificData;
      await this.saveSignupData();

      return countrySpecificData;
    } catch (error) {
      console.error('Error fetching country-specific data:', error);
      throw error;
    }
  }

  async fetchRegionalData(): Promise<void> {
    try {
      const [states, localGovernments, neighborhoods] = await Promise.all([
        this.fetchRegionalDataFromTable('reg_state'),
        this.fetchRegionalDataFromTable('reg_local_government'),
        this.fetchRegionalDataFromTable('reg_neighborhood')
      ]);

      this.signupData.regionalData = {
        states,
        localGovernments,
        neighborhoods
      };

      await this.saveSignupData();
      console.log('Regional data fetched and saved successfully');
    } catch (error) {
      console.error('Error fetching regional data:', error);
      this.signupData.regionalData = {
        states: [],
        localGovernments: [],
        neighborhoods: []
      };
      await this.saveSignupData();
    }
  }

  private async fetchRegionalDataFromTable(table: string): Promise<any[]> {
    console.log(`Fetching regional data from ${table}`);
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*');

      if (error) {
        console.error(`Error fetching data from ${table}:`, error);
        return []; // Return an empty array if there's an error
      }

      return data || [];
    } catch (error) {
      console.error(`Error fetching data from ${table}:`, error);
      return []; // Return an empty array for any other errors
    }
  }
  private async fetchDataFromTable(table: string, column: string, countryName: string): Promise<string[]> {
    console.log(`Fetching data from ${table} for country: ${countryName}`);
    try {
      const { data: tableInfo, error: tableError } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (tableError) {
        console.error(`Error checking table ${table}:`, tableError);
        throw new Error(`Table ${table} might not exist or you don't have permission to access it`);
      }

      const { data, error } = await supabase
        .from(table)
        .select(`${column}, country_name`)
        .eq('country_name', countryName);

      if (error) {
        console.error(`Error fetching data from ${table}:`, error);
        throw error;
      }

      console.log(`Raw data fetched from ${table}:`, data);

      if (!data || data.length === 0) {
        console.log(`No data found in ${table} for country: ${countryName}`);
        return [];
      }

      const result = data.map(item => item[column]);
      console.log(`Processed data from ${table}:`, result);
      return result;
    } catch (error) {
      console.error(`Error fetching data from ${table}:`, error);
      throw error;
    }
  }

  getCountrySpecificData(): CountrySpecificData | null {
    return this.signupData.countrySpecificData;
  }

  getRegionalData(): RegionalData | null {
    return this.signupData.regionalData;
  }

  private async saveSignupData(): Promise<void> {
    try {
      await AsyncStorage.setItem('signupData', JSON.stringify(this.signupData));
    } catch (error) {
      console.error('Error saving signup data:', error);
    }
  }

  async loadSignupData(): Promise<void> {
    try {
      const savedData = await AsyncStorage.getItem('signupData');
      if (savedData) {
        this.signupData = JSON.parse(savedData);
      }
    } catch (error) {
      console.error('Error loading signup data:', error);
    }
  }

  async clearSignupData(): Promise<void> {
    this.signupData = {
      location: null,
      countrySpecificData: null,
      regionalData: null,
    };
    this.countries = [];
    await AsyncStorage.removeItem('signupData');
  }
}

export const signupDataManager = SignupDataManager.getInstance();