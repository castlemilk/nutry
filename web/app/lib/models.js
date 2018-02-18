import { Map } from 'immutable';
export class Nutrient {
  constructor(prefix, name, ageGroup, portion) {
    this.prefix = prefix;
    this.name = name;
    this.ageGroup = ageGroup;
    this.portion = portion;
    this.rdi = null;
  }
  get portion() {
    return this.portion;
  }
  get name() {
    return this.name;
  }
  get ageGroup() {
    return this.ageGroup;
  }
  get prefix() {
    return this.prefix;
  }
  set rdi(rdi) {
    this.rdi = rdi;
  }
  get object() {
    return Map({
      prefix: this.prefix,
      name: this.name,
      ageGroup: this.ageGroup,
      portion: this.portion,
      rdi: this.rdi,
    });
  }
}
