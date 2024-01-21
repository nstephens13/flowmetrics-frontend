import { defineStore } from 'pinia';
import type { DurationLikeObject } from 'luxon';
import type { CategoryIF } from '@/model/Sla/CategoryIF';
import type { RuleIF } from '@/model/Sla/RuleIF';

const useSlaRulesStore = defineStore('sla', {
  state: () => ({
    categories: [] as CategoryIF[],
  }),

  actions: {
    addRule(category: CategoryIF, rule: RuleIF) {
      if (category.id != null && category.id >= 1) {
        const index = this.categories.findIndex((c) => c.id === category?.id);
        if (index !== -1) {
          const ruleToAdd = rule;
          ruleToAdd.id = this.categories[index].rules.length + 1;
          this.categories[index].rules.push(ruleToAdd);
        }
      }
    },
    deleteRule(category: CategoryIF, rule: RuleIF) {
      if (category.id != null && category.id >= 1) {
        const index = this.categories.findIndex((c) => c.id === category?.id);
        if (index !== -1) {
          const ruleIndex = this.categories[index].rules.findIndex((r) => r.id === rule?.id);
          if (ruleIndex !== -1) {
            this.categories[index].rules.splice(ruleIndex, 1);
          }
        }
      }
    },
    addCategory(category: CategoryIF) {
      const categoryToAdd = category;
      categoryToAdd.id = this.categories.length + 1;
      this.categories.push(categoryToAdd);
    },
    deleteCategory(category: CategoryIF) {
      if (category.id != null && category.id >= 1) {
        const index = this.categories.findIndex((c) => c.id === category?.id);
        if (index !== -1) {
          this.categories.splice(index, 1);
        }
      }
    },
    addReactionTime(category: CategoryIF, rule: RuleIF, reactionTime: DurationLikeObject | null) {
      if (category.id != null && category.id >= 1) {
        const index = this.categories.findIndex((c) => c.id === category?.id);
        if (index !== -1) {
          const ruleIndex = this.categories[index].rules.findIndex((r) => r.id === rule?.id);
          if (ruleIndex !== -1) {
            this.categories[index].rules[ruleIndex].reactionTime = reactionTime;
          }
        }
      }
    },
  },
});

export default useSlaStore;
