import { Duration } from 'luxon';
import { faker } from '@faker-js/faker';
import type { RuleIF } from '@/model/Sla/RuleIF';
import Priority from '@/assets/__mockdata__/IssueProps/priority';
import IssueTypes from '@/assets/__mockdata__/IssueProps/issueTypes';

export default function generateRules(): RuleIF[] {
  const rules: RuleIF[] = [];
  const numberOfRules = Math.floor(Math.random() * 6) + 5;
  for (let i = 0; i < numberOfRules; i++) {
    rules.push({
      id: i + 1,
      name: `SLA Rule ${i + 1}`,
      reactionTime: Duration.fromObject({
        days: Math.floor(Math.floor(Math.random() * 30) + 1),
      }).toObject(),
      expirationDate: faker.date.soon({ days: Math.floor(Math.random() * 21) + 1 }) as Date,
      occurredIn: faker.helpers.arrayElement(['Test', 'Pre-production', 'Production']),
      priority: Object.values(Priority),
      issueType: Object.values(IssueTypes)[i],
    });
  }
  return rules;
}
