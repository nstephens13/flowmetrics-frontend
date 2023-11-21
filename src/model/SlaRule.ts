export interface SlaRule {
  id: number | null;
  name: string | null;
  reactionTimeInDays: number | null;
  expirationDate: Date | null;
  occurredIn: string | null;
}
