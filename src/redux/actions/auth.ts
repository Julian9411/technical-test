import { createAction } from '@reduxjs/toolkit';

export const addAuth = createAction<Record<string, string>>('AUTH');
export const logAut = createAction('LOG_AUT');

