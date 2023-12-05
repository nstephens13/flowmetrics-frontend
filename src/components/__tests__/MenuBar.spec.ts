import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import router from '@/router/index';
import MenuBar from '@/components/MenuBar.vue';

// Describe block for the test suite
describe('Menubar Button should open sidebar', () => {
  // Mounting the MenuBar component with necessary configuration
  const wrapper = mount(MenuBar, {
    global: {
      plugins: [PrimeVue, router],
      components: {
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
    expect(wrapper.isVisible()).toBe(true);
  });

  // Test to check opening and closing of the sidebar
  test('should open and close sidebar', async () => {
    expect(wrapper.getComponent(Menubar).isVisible()).toBe(true);
    await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 40 })); // mouse on 4O or less axis show SideMenu
    expect(wrapper.getComponent(Sidebar).vm.$props.visible).toBe(true);
    await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 301 })); // mouse after 300 axis hide SideMenu
    expect(wrapper.getComponent(Sidebar).vm.$props.visible).toBe(false);
  });

  // Test to check the number of items in the sidebar menu
  test('sidebar menu four items', async () => {
    const menubar = wrapper.findComponent(Menu);
    expect(menubar.exists()).toBe(false);
    await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 40 }));
    wrapper.findComponent(Menu);
    const menu = await wrapper.getComponent(Sidebar).getComponent(Menu);
    expect(menu.findAll('.p-menuitem').length).toBe(4);
  });
});
