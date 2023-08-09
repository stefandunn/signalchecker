import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

type geoIPResponse = {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
};

export const GET = async () => {
  return axios
    .get("https://api.ipify.org/?format=json")
    .then(({ data: { ip } }: AxiosResponse<{ ip: string }>) =>
      axios
        .get(`https://ipapi.co/${ip}/json/`)
        .then(
          ({
            data: { longitude, latitude },
          }: AxiosResponse<geoIPResponse>) => ({
            longitude,
            latitude,
          })
        )
    )
    .then(({ latitude, longitude }) => {
      return NextResponse.json({ latitude, longitude });
    })
    .catch((e: Error) => {
      return NextResponse.json({ error: e.message }, { status: 400 });
    });
};
