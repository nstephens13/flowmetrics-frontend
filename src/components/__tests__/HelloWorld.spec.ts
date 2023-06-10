import { describe, it, expect } from 'vitest';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import PrimeVue from 'primevue/config';

import { mount } from '@vue/test-utils';
import ComponentDemo from '../ComponentDemo.vue';

const wrapper = mount(ComponentDemo, {
  props: { msg: 'Hello Vitest' },
  global: {
    plugins: [PrimeVue],
    components: { Button, Calendar },
  },
});

describe('ComponentDemo', () => {
  it('renders properly', () => {
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
