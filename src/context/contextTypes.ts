import { AppContextState } from './app/appSlice';
import { PersistState } from './persist/persistSlice';

export interface ContextReduxState {
  context: {
    app: AppContextState,
    persist: PersistState,
  }
}
