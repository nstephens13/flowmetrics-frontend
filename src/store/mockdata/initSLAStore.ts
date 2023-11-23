import useSlaStore from '@/store/slaStore';
import type { SlaCategory } from '@/model/SlaCategory';

export default function initSlaStore() {
  const slaStore = useSlaStore();
  slaStore.addSubscriber({
    id: 1,
    name: 'Customer 1',
    description: 'Description 1',
  });
  slaStore.addSubscriber({
    id: 2,
    name: 'Customer 2',
    description: 'Description 2',
  });
  slaStore.addSubscriber({
    id: 3,
    name: 'Customer 3',
    description: 'Description 3',
  });
  slaStore.addRule({
    id: 1,
    name: 'Pre-Config 1',
    reactionTimeInDays: 3,
    expirationDate: null,
    occurredIn: 'Test',
    priority: 'behindernd',
    issueType: ['bug', 'test'],
  });
  slaStore.addRule({
    id: 2,
    name: 'Pre-Config 2',
    reactionTimeInDays: null,
    expirationDate: new Date('2023-07-17'),
    occurredIn: 'Pre-production',
    priority: null,
    issueType: ['bug'],
  });
  slaStore.addRule({
    id: 3,
    name: 'Pre-Config 3',
    reactionTimeInDays: 7,
    expirationDate: new Date('2023-12-19'),
    occurredIn: 'Production',
    priority: 'Kosmetik',
    issueType: ['documentation'],
  });

  // Add 5 SLA Categories
  for (let i = 1; i < 6; i++) {
    const amountSubscribers = i % slaStore.customer.length;
    const rulesIndex = i % slaStore.rules.length;
    const category: SlaCategory = {
      id: null,
      name: `savedConfig_${i}`,
      customerProject: slaStore.customer[amountSubscribers],
      rule: slaStore.rules[rulesIndex],
    };

    slaStore.addSlaCategory(category);
  }
}
