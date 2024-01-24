import { defineStore } from 'pinia';
import type { DurationLikeObject } from 'luxon';
import type { CategoryIF } from '@/model/Sla/CategoryIF';
import type { RuleIF } from '@/model/Sla/RuleIF';

const useSlaRulesStore = defineStore('SLA rules store', {
  state: () => ({
    categories: [] as CategoryIF[],
  }),
  actions: {
    addRule(category: CategoryIF, rule: RuleIF) {
      if (category.id != null && category.id >= 1) {
        const index = this.categories.findIndex((c) => c.id === category?.id);
        if (index !== -1) {
          this.categories[index].rules.push(rule);
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
      this.categories.push(category);
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
    getCategoriesContainingProject(projectId: number): CategoryIF[] {
      return this.categories.filter((category) => category.project.id === projectId);
    },
    getRulesFromCategoryWithIssueType(category: CategoryIF, issueType: string): RuleIF[] {
      const rules: RuleIF[] = [];
      if (category.id != null && category.id >= 1) {
        const index = this.categories.findIndex((c) => c.id === category?.id);
        if (index !== -1) {
          this.categories[index].rules.forEach((rule) => {
            if (rule.issueType === issueType) {
              rules.push(rule);
            }
          });
        }
      }
      return rules;
    },
  },
});

export default useSlaRulesStore;
