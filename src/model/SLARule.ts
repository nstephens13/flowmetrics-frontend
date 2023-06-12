import type { SLACategory } from '@/model/SLACategory';
import type { SLADeadline } from '@/model/SLADeadline';

export interface SLARule {
  category: SLACategory | null;
  deadline: SLADeadline | null;
}
