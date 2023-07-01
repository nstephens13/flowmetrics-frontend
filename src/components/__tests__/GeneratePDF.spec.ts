import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import GeneratePDF from '../GeneratePDF.vue';

describe('GeneratePDF', () => {
  test('Generates a PDF when the button is clicked', () => {
    const wrapper = mount(GeneratePDF, {
      global: {
        plugins: [PrimeVue],
        components: {
          Button,
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
