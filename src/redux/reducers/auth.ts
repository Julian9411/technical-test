import {createReducer} from '@reduxjs/toolkit';
import { addAuth, logAut } from '../actions/auth';

interface IAuth {
  auth: Record<string, string>;
}

export const initialState = {
  auth: {},
} as IAuth;

const profile = createReducer(initialState, builder => {
  builder
    .addCase(addAuth, (state, action) => {
      state.auth = action.payload;
    })
    .addCase(logAut, (state) => {
      state.auth = {};
    })
});

export default profile;
