import type { SLACategory } from '@/model/SLACategory';
import SLACategories from './__mockdata__/SLACategories.json';
import SLADeadlinesObjects from './__mockdata__/SLADeadlines.json';

function fetchSLARules():SLACategory[] {
  const slaRulesToReturn: SLACategory[] = [];

  SLACategories.forEach((category) => {
    SLADeadlinesObjects.forEach((deadlineFromFile) => {
      if (deadlineFromFile.categoryId === category.id) {
        slaRulesToReturn.push({
          category,
          deadline: {
            categoryId: deadlineFromFile.categoryId,
            durationInDays: deadlineFromFile.durationInDays,
            expirationDate: new Date(deadlineFromFile.expirationDate),
          },
        });
      }
    });
  });

  return slaRulesToReturn;
}

export default fetchSLARules;
