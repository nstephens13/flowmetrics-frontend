import initSlaRulesStore from '@/store/mockdata/initSlaRulesStore';
import { initFilterConfigStore } from '@/store/mockdata/initFilterConfigStore';
import initProjectStore from '@/store/mockdata/initProjectStore';

/**
 * @description function to initialize all stores
 */
async function initializeStores() {
  await initProjectStore();
  initFilterConfigStore();
  initSlaRulesStore();
}

export default initializeStores;
