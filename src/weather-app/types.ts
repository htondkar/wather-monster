import { AppState } from 'App';
import { IWeatherAPI } from 'network/interfaces';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type DispatchWithThunk<A extends Action> = ThunkDispatch<AppState, IWeatherAPI, A>
export type ThunkResult<A extends Action> = ThunkAction<void, AppState, IWeatherAPI, A>
