import {mount} from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PrimeVue from 'primevue/config'
import router from '@/router/index'

import Avatar from 'primevue/avatar'
import Chip from 'primevue/chip'
import Divider from 'primevue/divider'
import ProgressBar from 'primevue/progressbar'

import EmployeeCard from '../EmployeeCard.vue'
import { Issue } from '@/model/Issue'

describe('Employee Card should load all the Components', () => {
    const wrapper = mount(EmployeeCard, {
        global: {
            plugins: [PrimeVue, router],
            components: {
                Avatar,
                Chip,
                Divider,
                ProgressBar
            }
        },
        propsData: {
                employee: {
                    id: 19,
                    firstName: "Erika",
                    lastName: "Mustermann"
                },
                 issues: {
                    openIssues: 20,
                    inProgressIssues: 5,
                    closedIssues: 15,
                 }        
            }
        }  
    )
    
    const totaltickets = 40;
    test('it mounts', () => {
        expect(wrapper.exists()).toBe(true)
        expect(wrapper.getComponent(Avatar).isVisible()).toBe(true)
        expect(wrapper.getComponent(Chip).isVisible()).toBe(true)
        expect(wrapper.getComponent(Divider).isVisible()).toBe(true)
        expect(wrapper.getComponent(ProgressBar).isVisible()).toBe(true)
    })
    test('Label on Avatar Component', () => {
        expect(wrapper.getComponent(Avatar).props('label')).toBe('EM')
    })
    test('Label on Chip component', () => {
        expect(wrapper.getComponent(Chip).props('label')).toBe('Employee ID : 19')
    })
    test('checks for total tickets', () => {
        const label = wrapper.find('label[for="totaltickets"]');
        const labelText = label.text();
        const expectedTotalTickets = 40; // Calculate the expected value based on the provided issues

        expect(labelText).toContain(expectedTotalTickets);
    })
    test('Progressbars checks', () => {
        const progressBar1 = wrapper.find('.openIssuesProgressbar');
        expect(progressBar1.attributes('label')).toBe((20 / 40 * 100).toString());
        const progressBar2 = wrapper.find('.inProgressIssuesProgressbar');
        expect(progressBar2.attributes('label')).toBe((5 / 40 * 100).toString());
        const progressBar3 = wrapper.find('.closedIssuesProgressbar');
        expect(progressBar3.attributes('label')).toBe((15 / 40 * 100).toString());


    })
})
