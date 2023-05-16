import Realm from 'realm';

export class Settings extends Realm.Object<Settings> {
  optionKey!: string;
  optionVal!: number;

  static schema = {
    name: 'Settings',
    properties: {
      optionKey: 'string',
      optionVal: { type: 'int', default: 0 },
    },
  };
}
