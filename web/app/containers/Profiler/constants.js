/*
 *
 * Profiler constants
 *
 */
const prefix = (name) => `app/Profiler/${name}`;

export const CHANGE_PROFILER_SEARCH = prefix('CHANGE_PROFILER_SEARCH');
export const SEARCH_COMPLETE = prefix('SEARCH_COMPLETE');
export const SEARCH_LOADING = prefix('SEARCH_LOADING');
export const SEARCH_FAILURE = prefix('SEARCH_FAILURE');
export const ADD_PROFILER_ELEMENT = prefix('ADD_PROFILER_ELEMENT');
export const DELETE_PROFILER_ELEMENT = prefix('DELETE_PROFILER_ELEMENT');

export const UPDATE_PROFILER_ELEMENT = prefix('UPDATE_PROFILER_ELEMENT');
