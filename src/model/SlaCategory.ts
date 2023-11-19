import type { SlaSubscriber } from '@/model/SlaSubscriber';
import type { SlaRule } from '@/model/SlaRule';

export interface SlaCategory {
  id: number | null;
  name: string | null;
  subscriber: SlaSubscriber | null;
  rule: SlaRule | null;
}
