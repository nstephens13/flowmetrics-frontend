import type { SLASubscriber } from '@/model/SLASubscriber'
import type { SLARule } from '@/model/SLARule'

export interface SLACategory {
  id: number | null
  name: string | null
  subscriber: SLASubscriber | null
  rule: SLARule | null
}
