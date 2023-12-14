import { describe, expect, it } from 'vitest';
import { getIssueStatusList } from '@/model/ProjectIF';
import type { IssueIF } from '../Issue/IssueIF';

describe('getIssueStatusList', () => {
  it('returns an empty array if no issues are provided', () => {
    const issues: IssueIF[] = [];
    const result = getIssueStatusList(issues);
    expect(result).toEqual([]);
  });

  it('returns unique status list without non-displayed statuses', () => {
    const issues: IssueIF[] = [
      { status: 'open' } as IssueIF,
      { status: 'in progress' } as IssueIF,
      { status: 'closed' } as IssueIF,
      { status: 'resolved' } as IssueIF,
      { status: 'open' } as IssueIF,
      { status: null } as IssueIF,
    ];
    const result = getIssueStatusList(issues);
    expect(result).toEqual(['open', 'in progress']);
  });

  it('ignores null and Closed statuses in the input array', () => {
    const issues = [
      { status: 'open' } as IssueIF,
      { status: null } as IssueIF,
      { status: 'closed' } as IssueIF,
      { status: null } as IssueIF,
    ];
    const result = getIssueStatusList(issues);
    expect(result).toEqual(['open']);
  });
});
