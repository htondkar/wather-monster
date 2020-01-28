import { AppState } from 'appContext';
import { IWeatherAPI } from 'network/interfaces';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type DispatchWithThunk<A extends Action<string>> = ThunkDispatch<
  AppState,
  IWeatherAPI,
  A
>

export type ThunkResult<A extends Action<string>> = ThunkAction<
  void,
  AppState,
  IWeatherAPI,
  A
>

export interface Action<T extends string, Payload = any> {
  type: T
  payload: Payload
  error: boolean
}
