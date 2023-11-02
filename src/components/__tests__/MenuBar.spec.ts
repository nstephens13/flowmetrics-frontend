import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import { createTestingPinia } from '@pinia/testing';
import router from '@/router/index';
import MenuBar from '@/components/MenuBar.vue';

// Describe block for the test suite
describe('Menubar Button should open sidebar', () => {
  // Mounting the MenuBar component with necessary configuration
  const wrapper = mount(MenuBar, {
    global: {
      plugins: [
        PrimeVue,
        router,
        createTestingPinia({
          createSpy: vi.fn,
          stubActions: false,
          initialState: {
            token: {
              token: '',
            },
          },
        }),
      ],
      components: {
        Button,
        Menu,
        Menubar,
        Sidebar,
      },
      stubs: {
        teleport: false,
      },
    },
  });

  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Menubar).isVisible()).toBe(true);
    expect(wrapper.getComponent(Button).isVisible()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

  // Test to check opening and closing of the sidebar
  test('should open and close sidebar', async () => {
    let menubar = wrapper.findComponent(Menu);
    expect(menubar.exists()).toBe(false);

    const button = wrapper.getComponent(Menubar).findComponent(Button);
    await button.trigger('click');

    expect(wrapper.getComponent(Sidebar).vm.$props.visible).toBe(true);
    menubar = wrapper.findComponent(Menu);

    await button.trigger('click');
    expect(wrapper.getComponent(Sidebar).vm.$props.visible).toBe(false);
  });

  // Test to check the number of items in the sidebar menu
  test('sidebar menu four items', async () => {
    const menubar = wrapper.findComponent(Menu);
    expect(menubar.exists()).toBe(false);
    const button = wrapper.getComponent(Menubar).findComponent(Button);
    await button.trigger('click');
    wrapper.findComponent(Menu);
    const menu = await wrapper.getComponent(Sidebar).getComponent(Menu);
    expect(menu.findAll('.p-menuitem').length).toBe(4);
  });
});
