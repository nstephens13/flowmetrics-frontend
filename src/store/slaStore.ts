import { defineStore } from 'pinia';
import type { SlaRule } from '@/model/Sla/SlaRule';
import type { SlaCategory } from '@/model/Sla/SlaCategory';
import type { SlaCustomerProject } from '@/model/Sla/SlaCustomerProject';

const useSlaStore = defineStore('sla', {
  state: () => ({
    customer: [] as SlaCustomerProject[],
    rules: [] as SlaRule[],
    slaCategories: [] as SlaCategory[],
  }),

  actions: {
    addSubscriber(subscriber: SlaCustomerProject) {
      const subscriberToAdd = subscriber;
      subscriberToAdd.id = this.customer.length + 1;
      this.customer.push(subscriberToAdd);
    },
    addRule(rule: SlaRule) {
      const ruleToAdd = rule;
      ruleToAdd.id = this.rules.length + 1;
      this.rules.push(ruleToAdd);
    },
    addSlaCategory(category: SlaCategory) {
      const categoryToAdd = category;
      categoryToAdd.id = this.slaCategories.length + 1;
      this.slaCategories.push(categoryToAdd);
    },
    deleteSlaCategory(category: SlaCategory) {
      if (category.id != null && category.id >= 1) {
        const index = this.slaCategories.findIndex((c) => c.id === category?.id);
        if (index !== -1) {
          this.slaCategories.splice(index, 1);
        }
      }
    },
    addReactionTime(rule: SlaRule, reactionTimeInDays: number) {
      const index = this.rules.findIndex((r) => r.id === rule?.id);
      if (index !== -1) {
        this.rules[index].reactionTimeInDays = reactionTimeInDays;
      }
    },
  },
});

export default useSlaStore;
