import useSLAStore from '@/store/SLAStore';

export default function initSLAStore() {
  const slaStore = useSLAStore();
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
    durationInDays: 3,
    expirationDate: null,
    maxAssignedEmployees: 3,
    occurredIn: 'Test',
  });
  slaStore.addRule({
    id: 2,
    name: 'Pre-Config 2',
    durationInDays: null,
    expirationDate: new Date('2023-07-17'),
    maxAssignedEmployees: 4,
    occurredIn: 'Pre-production',
  });
  slaStore.addRule({
    id: 3,
    name: 'Pre-Config 3',
    durationInDays: 7,
    expirationDate: new Date('2023-12-19'),
    maxAssignedEmployees: 7,
    occurredIn: 'Production',
  });
}
