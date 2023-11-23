import type { SlaCustomerProject } from '@/model/SlaCustomerProject';
import type { SlaRule } from '@/model/SlaRule';

export interface SlaCategory {
  id: number | null;
  name: string | null;
  customerProject: SlaCustomerProject;
  rule: SlaRule | null;
}
