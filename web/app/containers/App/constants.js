/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
/*
 *
 * LandingPage constants
 *
 */
const prefix = (name) => `app/App/${name}`;
export const DEFAULT_ACTION = prefix('DEFAULT_ACTION');
export const LOGIN_FAILURE = prefix('LOGIN_FAILURE');
export const LOGIN_SUCCESS = prefix('LOGIN_SUCCESS');
export const LOGIN_CLICKED = prefix('LOGIN_CLICKED');
