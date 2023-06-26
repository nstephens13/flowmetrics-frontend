import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import Panel from 'primevue/panel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Divider from 'primevue/divider'
import router from '@/router/index'
import ProjectDescriptionPanel from '@/components/ProjectDescriptionPanel.vue'

describe('Project Overview should load all the Components', () => {
  const wrapper = mount(ProjectDescriptionPanel, {
    global: {
      plugins: [PrimeVue, router],
      components: {
        Dropdown,
        Panel,
        Card,
        DataTable,
        Column,
        Divider
      }
    }
  })

  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.getComponent(Dropdown).isVisible()).toBe(true)
    expect(wrapper.getComponent(Card).isVisible()).toBe(true)
    expect(wrapper.getComponent(Panel).isVisible()).toBe(true)
  })

  test('Dropdown select should be shown and in English', () => {
    expect(wrapper.getComponent(Dropdown).props('placeholder')).toBe('Select a project')
  })

  test('Dropdown Selection should contain all projects', () => {
    wrapper
      .getComponent(Dropdown)
      .trigger('click')
      .then(() => {
        const dropdownOptions = wrapper.getComponent(Dropdown).props('options')
        expect(dropdownOptions.length).toEqual(6)
      })
  })
})
