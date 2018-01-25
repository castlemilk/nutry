/*
 *
 * FoodProfile actions
 *
 */
import { defaultPortions } from 'lib/nutrientMap';
import {
  DEFAULT_ACTION,
  ON_BACK,
  GET_PROFILE,
  TAB_CHANGED,
  PORTION_CHANGED,
  AGE_GROUP_CHANGED,
  NUTRIENT_SELECTED,
  GET_PROFILE_FAILURE,
  GET_PROFILE_SUCCESS,
} from './constants';


export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function loadProfile(serialNumber, source) {
  return {
    type: GET_PROFILE,
    serialNumber,
    source,
  };
}
export function loadProfileSuccess(profileBody) {
  return {
    type: GET_PROFILE_SUCCESS,
    nutrientsById: profileBody.nutrients,
    portionsAvailable: defaultPortions(profileBody.portions),
  };
}
export function loadProfileFailure(error) {
  return {
    type: GET_PROFILE_FAILURE,
    error,
  };
}
export function tabChanged(tab) {
  return {
    type: TAB_CHANGED,
    tab,
  };
}
export function nutrientSelected(prefix, id) {
  return {
    type: NUTRIENT_SELECTED,
    prefix,
    id,
  };
}
export function portionChanged(portionSelected) {
  return {
    type: PORTION_CHANGED,
    portionSelected,
  };
}
export function ageGroupChanged(ageGroupSelected) {
  return {
    type: AGE_GROUP_CHANGED,
    ageGroupSelected,
  };
}

export function onBack() {
  return {
    type: ON_BACK,
  };
}
export function clearFoodProfile() {
  return {
    type: ON_BACK,
  };
}
