import { createRealmContext } from '@realm/react';
import { Settings } from './Settings';

export const Context = createRealmContext({
  schema: [Settings],
});
