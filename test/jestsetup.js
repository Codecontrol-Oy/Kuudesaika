// Make Enzyme functions available in all test files without importing
import { shallow, render, mount } from 'enzyme';

global.shallow = shallow;
global.render = render;
global.mount = mount;
// Fail tests on any warning
console.error = message => {
   throw new Error(message);
};

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value
  }

  removeItem(key) {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock