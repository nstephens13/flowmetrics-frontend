import { defineStore } from 'pinia';
import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';
import type { SLACategory } from '@/model/SLACategory';

const useSLAStore = defineStore('sla', {
  state: () => ({
    subscriber: [] as SLASubscriber[],
    rules: [] as SLARule[],
    slaCategories: [] as SLACategory[],
  }),

  actions: {
    addSubscriber(subscriber: SLASubscriber) {
      const subscriberToAdd = subscriber;
      subscriberToAdd.id = this.subscriber.length + 1;
      this.subscriber.push(subscriberToAdd);
    },
    addRule(rule: SLARule) {
      const ruleToAdd = rule;
      ruleToAdd.id = this.rules.length + 1;
      this.rules.push(ruleToAdd);
    },
    addSLACategory(category: SLACategory) {
      const categoryToAdd = category;
      categoryToAdd.id = this.slaCategories.length + 1;
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
  },
});

export default useSLAStore;
