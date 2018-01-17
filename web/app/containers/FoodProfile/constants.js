/*
 *
 * FoodProfile constants
 *
 */

const prefix = (name) => `app/FoodProfile/${name}`;
export const DEFAULT_ACTION = prefix('DEFAULT_ACTION');

export const GET_PROFILE = prefix('GET_PROFILE');
export const GET_PROFILE_SUCCESS = prefix('GET_PROFILE_SUCCESS');
export const GET_PROFILE_FAILURE = prefix('GET_PROFILE_FAILURE');

export const TAB_CHANGED = prefix('TAB_CHANGED');
export const PORTION_CHANGED = prefix('PORTION_CHANGED');
export const NUTRIENT_SELECTED = prefix('NUTRIENT_SELECTED');

export const HEADER = 'HEADER';
export const PARENT_ROW = 'PARENTR_ROW';
export const PARENT_NONAME_ROW = 'PARENT_NONAME_ROW';
export const CHILD_ROW = 'CHILD_ROW';
export const CHILD2_ROW = 'CHILD2_ROW';
