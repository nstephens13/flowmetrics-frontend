import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import router from '@/router/index';
import MenuBar from '@/components/MenuBar.vue';
import SlideMenuButton from '@/components/SlideMenuButton.vue';

// Describe block for the test suite
describe('Menubar and sidebar', () => {
  // Mounting the MenuBar component with necessary configuration
  const wrapper = mount(MenuBar, {
    global: {
      plugins: [PrimeVue, router],
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
  test('should slide and hide sidebar', async () => {
    expect(wrapper.getComponent(Menubar).isVisible()).toBe(true);
    const button = wrapper.getComponent(Menubar).findComponent(Button);
    await button.trigger('click');
    expect(wrapper.getComponent(Sidebar).vm.$props.visible).toBe(true);
    const slideMenuButton = wrapper.findComponent(SlideMenuButton);
    await slideMenuButton.trigger('mouseenter');
    expect(wrapper.getComponent(Sidebar).vm.$props.visible).toBe(true);
    await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 301 })); // mouse after 300 axis hide SideMenu
    expect(wrapper.getComponent(Sidebar).vm.$props.visible).toBe(false);
  });

  // Test to check the number of items in the sidebar menu
  test('sidebar menu four items', async () => {
    const menubar = wrapper.findComponent(Menu);
    expect(menubar.exists()).toBe(false);
    const slideMenuButton = wrapper.findComponent(SlideMenuButton);
    await slideMenuButton.trigger('mouseenter');
    wrapper.findComponent(Menu);
    const menu = await wrapper.getComponent(Sidebar).getComponent(Menu);
    expect(menu.findAll('.p-menuitem').length).toBe(4);
  });
});
