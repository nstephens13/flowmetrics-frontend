import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ProjectDescriptionPanel from '../ProjectDescriptionPanel.vue';
import router from '../../router';
import PrimeVue from 'primevue/config';
//import getMockData from '../assets/__mockdata__/mockDataComposer.ts';


import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import Panel from 'primevue/panel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Divider from 'primevue/divider';

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
          Divider,
        },
        stubs: {
          teleport: false,
        },
      },
    });

    test('it mounts', () =>{
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.getComponent(Dropdown).isVisible()).toBe(true);
        expect(wrapper.getComponent(Card).isVisible()).toBe(true);
        expect(wrapper.getComponent(Panel).isVisible()).toBe(true);
    });
    /*
    test('Dropdown component contains all values from the array', () => {
        const projects = [
            getMockData(1),
            getMockData(2),
            getMockData(3),
            getMockData(53),
            getMockData(54),
            getMockData(55),
        ];
        
      });
     */ 
});