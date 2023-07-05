import { defineStore } from 'pinia';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';

const useSLAStore = defineStore('sla', {
  state: () => ({
    subscriber: [
      { id: 1, name: 'Customer 1', description: 'Description 1' },
      { id: 2, name: 'Customer 2', description: 'Description 2' },
      { id: 3, name: 'Customer 3', description: 'Description 3' },
    ] as SLASubscriber[],
    rules: [
      {
        id: 1,
        name: 'Pre-Config 1',
        durationInDays: 3,
        expirationDate: null,
      },
      {
        id: 2,
        name: 'Pre-Config 2',
        durationInDays: null,
        expirationDate: new Date('2023-07-17'),
        maxAssignedEmployees: 4,
      },
      {
        id: 3,
        name: 'Pre-Config 3',
        durationInDays: 7,
        expirationDate: new Date('2023-12-19'),
        maxAssignedEmployees: 7,
      },
    ] as SLARule[],
    slaCategories: [] as SLACategory[],
    subscribersIdCount: 3,
    rulesIdCount: 3,
    slaCategoriesIdCount: 0,
  }),

  actions: {
    addSubscriber(subscriber: SLASubscriber) {
      this.subscribersIdCount += 1;
      const subscriberToAdd = subscriber;
      subscriberToAdd.id = this.subscribersIdCount;
      this.subscriber.push(subscriberToAdd);
    },
    addRule(rule: SLARule) {
      this.rulesIdCount += 1;
      const ruleToAdd = rule;
      ruleToAdd.id = this.rulesIdCount;
      this.rules.push(ruleToAdd);
    },
    addSLACategory(category: SLACategory) {
      this.slaCategoriesIdCount += 1;
      const categoryToAdd = category;
      categoryToAdd.id = this.slaCategoriesIdCount;
      this.slaCategories.push(categoryToAdd);
    },
    deleteSLACategory(category: SLACategory) {
      if (category.id != null && category.id >= 1) {
        const index = this.slaCategories.findIndex((c) => c.id === category?.id);
        if (index !== -1) {
          this.slaCategories.splice(index, 1);
        }
      }
    },

    initializeCategories() {
      for (let i = 1; i < 6; i++) {
        const amountSubscribers = i % this.subscriber.length;
        const rulesIndex = i % this.rules.length;
        const category: SLACategory = {
          id: null,
          name: `savedConfig_${i}`,
          subscriber: this.subscriber[amountSubscribers],
          rule: this.rules[rulesIndex],
        };

        this.addSLACategory(category);
      }
    },
  },
});

export default useSLAStore;
