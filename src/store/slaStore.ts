import { defineStore } from 'pinia';
import type { SlaSubscriber } from '@/model/SlaSubscriber';
import type { SlaRule } from '@/model/SlaRule';
import type { SlaCategory } from '@/model/SlaCategory';

const useSLAStore = defineStore('sla', {
  state: () => ({
    subscriber: [] as SlaSubscriber[],
    rules: [] as SlaRule[],
    slaCategories: [] as SlaCategory[],
  }),

  actions: {
    addSubscriber(subscriber: SlaSubscriber) {
      const subscriberToAdd = subscriber;
      subscriberToAdd.id = this.subscriber.length + 1;
      this.subscriber.push(subscriberToAdd);
    },
    addRule(rule: SlaRule) {
      const ruleToAdd = rule;
      ruleToAdd.id = this.rules.length + 1;
      this.rules.push(ruleToAdd);
    },
    addSLACategory(category: SlaCategory) {
      const categoryToAdd = category;
      categoryToAdd.id = this.slaCategories.length + 1;
      this.slaCategories.push(categoryToAdd);
    },
    deleteSLACategory(category: SlaCategory) {
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
