import { defineStore } from 'pinia';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';

const useSLAStore = defineStore('sla', {
  state: () => ({
    subscriber: [
      { id: 1, name: 'Category 1', description: 'Description 1' },
      { id: 2, name: 'Category 2', description: 'Description 2' },
      { id: 3, name: 'Category 3', description: 'Description 3' },
    ] as SLASubscriber[],
    rules: [
      {
        id: 1, name: 'Deadline 1', durationInDays: 3, expirationDate: new Date('2023-07-15'),
      },
      {
        id: 2, name: 'Deadline 2', durationInDays: 5, expirationDate: new Date('2023-07-17'),
      },
      {
        id: 3, name: 'Deadline 3', durationInDays: 7, expirationDate: new Date('2023-07-19'),
      },
    ] as SLARule[],
    slaCategories: [] as SLACategory[],

  }),

  actions: {
    addSubscriber(category: SLASubscriber) {
      this.subscriber.push(category);
    },
    addRule(deadline: SLARule) {
      this.rules.push(deadline);
    },
    addSLACategory(rule: SLACategory) {
      this.slaCategories.push(rule);
    },
    initializeCategories() {
      for (let i = 0; i < 5; i++) {
        const amountSubscribers = i % this.subscriber.length;
        const rulesIndex = i % this.rules.length;

        const category: SLACategory = {
          subscriber: this.subscriber[amountSubscribers],
          rule: this.rules[rulesIndex],
        };

        this.addSLACategory(category);
      }
    },
  },
});

export default useSLAStore;
