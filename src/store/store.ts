import fs from 'fs';
import { defineStore } from 'pinia';
import type { SLACategory } from '@/model/SLACategory';
import type { SLADeadline } from '@/model/SLADeadline';

const categoriesFilePath = './SLACategories.json';
const deadlinesFilePath = './SLADeadlines.json';

const useSLAStore = defineStore('sla', {
  state: () => ({
    categories: [] as SLACategory[],
    deadlines: [] as SLADeadline[],
  }),
  actions: {
    setCategories(categories: SLACategory[]) {
      this.categories = categories;
      this.saveCategories();
    },
    setDeadlines(deadlines: SLADeadline[]) {
      this.deadlines = deadlines;
      this.saveDeadlines();
    },
    async fetchCategories() {
      try {
        const categoriesData = fs.readFileSync(categoriesFilePath, 'utf8');
        const categories = JSON.parse(categoriesData);
        this.setCategories(categories);
      } catch (error) {
        // Handle error
      }
    },
    async fetchDeadlines() {
      try {
        const deadlinesData = fs.readFileSync(deadlinesFilePath, 'utf8');
        const deadlines = JSON.parse(deadlinesData);
        this.setDeadlines(deadlines);
      } catch (error) {
        // Handle error
      }
    },
    async saveCategories() {
      try {
        const categoriesData = JSON.stringify(this.categories);
        fs.writeFileSync(categoriesFilePath, categoriesData, 'utf8');
      } catch (error) {
        // Handle error
      }
    },
    async saveDeadlines() {
      try {
        const deadlinesData = JSON.stringify(this.deadlines);
        fs.writeFileSync(deadlinesFilePath, deadlinesData, 'utf8');
      } catch (error) {
        // Handle error
      }
    },
  },
});

export default useSLAStore;
