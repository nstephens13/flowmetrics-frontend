import type { IssueIF } from '@/model/IssueIF';
import type { SLACategory } from '@/model/SLACategory';
import type { SLASubscriber } from '@/model/SLASubscriber';

export interface SLARule {
  id: number | null;
  name: string | null;
  durationInDays: number | null;
  expirationDate: Date | null;
  maxAssignedEmployees: number | null;
}
