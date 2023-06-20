import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import router from '@/router/index';
import MenuBar from '@/components/MenuBar.vue';

describe('Menubar Button should open sidebar', () => {
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

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.getComponent(Menubar).isVisible()).toBe(true);
    expect(wrapper.getComponent(Button).isVisible()).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
  });

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

  test('sidebar menu three items', async () => {
    const menubar = wrapper.findComponent(Menu);
    expect(menubar.exists()).toBe(false);
    const button = wrapper.getComponent(Menubar).findComponent(Button);
    await button.trigger('click');
    wrapper.findComponent(Menu);
    const menu = await wrapper.getComponent(Sidebar).getComponent(Menu);
    expect(menu.findAll('.p-menuitem').length).toBe(3);
  });
});
