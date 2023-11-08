import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import GeneratePDF from '../GeneratePDF.vue';

// define test suite
describe('GeneratePDF', () => {
  // define individual test case
  test('Generates a PDF when the button is clicked', async () => {
    const wrapper = mount(GeneratePDF, {
      global: {
        plugins: [PrimeVue],
        components: {
          Button,
        },
      },
    });

    // Click the "Generate PDF" button
    const button = wrapper.findComponent(Button).element;
    const clickEvent = new Event('click', {
      bubbles: true,
      cancelable: true,
    });
    button.dispatchEvent(clickEvent);

    // Verify that the button is not immediately disabled
    expect(button.getAttribute('disabled')).toBe(null);

    // Wait for 2 seconds (2000 milliseconds)
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    // Verify that the button is still not disabled after 2 seconds
    expect(button.getAttribute('disabled')).toBe(null);
  });
});
