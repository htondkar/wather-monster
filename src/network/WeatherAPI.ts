import { IWeatherAPI, WeatherReportResponse } from './interfaces';

export class WeatherAPI implements IWeatherAPI {
  private readonly baseUrl: string = 'http://api.openweathermap.org/data/2.5/weather'
  private apiKey: string

  public constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('apiKey is required')
    }

    this.apiKey = apiKey
  }

  private createBaseUrl(): URL {
    const url = new URL(this.baseUrl)
    url.searchParams.append('appid', this.apiKey)
    return url
  }

  public async getWeatherByCityName(city: string): Promise<WeatherReportResponse> {
    const url = this.createBaseUrl()
    url.searchParams.append('q', city)
    return fetch(url.toString()).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Can not get the report')
      }
    })
  }
}
