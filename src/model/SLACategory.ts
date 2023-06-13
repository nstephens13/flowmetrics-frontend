import type { SLASubscriber } from '@/model/SLASubscriber';
import type { SLARule } from '@/model/SLARule';

export interface SLACategory {
  subscriber: SLASubscriber | null;
  rule: SLARule | null;
}
