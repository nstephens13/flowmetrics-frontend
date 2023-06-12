import type { SLARule } from '@/model/SLARule';
import SLACategories from './__mockdata__/SLACategories.json';
import SLADeadlinesObjects from './__mockdata__/SLADeadlines.json';

function fetchSLARules():SLARule[] {
  const slaRulesToReturn: SLARule[] = [];

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
