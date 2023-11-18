export interface SLARule {
  id: number | null;
  name: string | null;
  durationInDays: number | null;
  expirationDate: Date | null;
  maxAssignedEmployees: number | null;
  occurredIn: string | null;
  customerProject: string[] | null;
  priority: string | null;
  issueType: string[] | null;
}
