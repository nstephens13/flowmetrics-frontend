import { mount } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import FlowMetricsTemplate from '../FlowMetricsTemplate.vue';

describe('FlowMetricsTemplate', () => {
  // Mounting the YourComponent component with necessary configuration
  const wrapper = mount(FlowMetricsTemplate, {
    global: {
      plugins: [PrimeVue],
      components: {
        Card,
        Divider,
      },
    },
  });

  // Test to check if the component mounts successfully
  test('it mounts', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
