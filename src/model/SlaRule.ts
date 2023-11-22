export interface SlaRule {
  id: number | null;
  name: string | null;
  durationInDays: number | null;
  expirationDate: Date | null;
  occurredIn: string | null;
  reactionTime: string | null;
}
