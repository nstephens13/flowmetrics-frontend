import { describe, expect, test } from 'vitest';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import router from '@/router';

import { VueWrapper, mount } from '@vue/test-utils';
import MenuBar from '../MenuBar.vue';

describe('Menubar Button should open sidebar', () => {
  test('should open sidebar', async () => {
    const wrapper: VueWrapper = mount(MenuBar, {
      global: {
        plugins: [PrimeVue, router],
        components: { Button, Sidebar, Menu, Menubar },
      },
    });

    let menu = wrapper.findComponent(Menu);
    expect(menu.exists()).toBe(false);

    const button = wrapper.findComponent(Button);
    await button.trigger('click');
    let sidebar = wrapper.findComponent(Sidebar);
    expect(sidebar.exists()).toBe(true);

    menu = wrapper.findComponent(Menu);
    expect(menu.exists()).toBe(true);

    await button.trigger('click');
    expect(sidebar.isVisible()).toBe(false);
  });
});