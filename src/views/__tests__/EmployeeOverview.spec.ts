import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PrimeVue from 'primevue/config'
import router from '@/router/index'

import Card from 'primevue/card'
import DataView from 'primevue/dataview'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'

import EmployeeOverview from '../EmployeeOverview.vue'

describe('Employee Overview should load all the Components', () => {
  const wrapper = mount(EmployeeOverview, {
    global: {
      plugins: [PrimeVue, router],
      components: {
        Card,
        DataView,
        Divider,
        Dropdown
      }
    }
  })

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(Card).isVisible()).toBe(true)
    expect(wrapper.findComponent(DataView).isVisible()).toBe(true)
    expect(wrapper.findComponent(Divider).isVisible()).toBe(true)
    expect(wrapper.findComponent(Dropdown).isVisible()).toBe(true)
  });

  test('Dropdown select should be shown and in English', () => {
    const dropdownPlaceholder = wrapper.findComponent(Dropdown).props('placeholder')
    expect(dropdownPlaceholder).toBe('Select a project')
  });

  test('Dropdown Selection should contain all projects', async () => {
    const dropdownOptions = wrapper.findComponent(Dropdown).props('options')
    expect(dropdownOptions.length).toEqual(6)
  });
})
