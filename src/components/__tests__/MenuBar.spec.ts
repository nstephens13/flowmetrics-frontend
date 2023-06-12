import { describe, it, expect } from 'vitest';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import PrimeVue from 'primevue/config';

import { mount } from '@vue/test-utils';
import MenuBar from '../MenuBar.vue';

const wrapper = mount(MenuBar, {
  props: {  },
  global: {
    plugins: [PrimeVue],
    components: { Button, Sidebar, Menu },
  },
});

describe('Button sidebarButton', () => {
  // Test if the button is clickable
  it('should be clickable', async () => {
    expect(wrapper.getComponent('Button').attributes().id).toBe("sidebarButton");

    // Assert that the button is clickable (e.g., check if a specific behavior happens when clicked)
    // You can add your own assertions based on your component's expected behavior
    // expect('button is clickable').toBeTruthy();
  });
});
