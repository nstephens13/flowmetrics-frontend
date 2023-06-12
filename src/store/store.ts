import { defineStore } from 'pinia';
import type { SLACategory } from '@/model/SLACategory';
import type { SLADeadline } from '@/model/SLADeadline';
import type { SLARule } from '@/model/SLARule';

const useSLAStore = defineStore('sla', {
  state: () => ({
    categories: [
      { id: 1, name: 'Category 1', description: 'Description 1' },
      { id: 2, name: 'Category 2', description: 'Description 2' },
      { id: 3, name: 'Category 3', description: 'Description 3' },
    ] as SLACategory[],
    deadlines: [
      {
        id: 1, name: 'Deadline 1', durationInDays: 3, expirationDate: new Date('2023-07-15'),
      },
      {
        id: 2, name: 'Deadline 2', durationInDays: 5, expirationDate: new Date('2023-07-17'),
      },
      {
        id: 3, name: 'Deadline 3', durationInDays: 7, expirationDate: new Date('2023-07-19'),
      },
    ] as SLADeadline[],
    slaRules: [] as SLARule[],

  }),

  actions: {
    addCategory(category: SLACategory) {
      this.categories.push(category);
    },
    addDeadline(deadline: SLADeadline) {
      this.deadlines.push(deadline);
    },
    addSLARule(rule: SLARule) {
      this.slaRules.push(rule);
    },
    initializeRules() {
      for (let i = 0; i < 5; i++) {
        const categoryIndex = i % this.categories.length;
        const deadlineIndex = i % this.deadlines.length;

        const rule: SLARule = {
          category: this.categories[categoryIndex],
          deadline: this.deadlines[deadlineIndex],
        };

        this.addSLARule(rule);
      }
    },
  },
});

export default useSLAStore;
