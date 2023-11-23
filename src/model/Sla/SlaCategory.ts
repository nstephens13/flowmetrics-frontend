import type { SlaSubscriber } from '@/model/Sla/SlaSubscriber';
import type { SlaRule } from '@/model/Sla/SlaRule';

export interface SlaCategory {
  id: number | null;
  name: string | null;
  subscriber: SlaSubscriber | null;
  rule: SlaRule | null;
}
