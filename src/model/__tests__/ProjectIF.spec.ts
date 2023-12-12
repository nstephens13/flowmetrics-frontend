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
      { status: 'Open' } as IssueIF,
      { status: 'In Progress' } as IssueIF,
      { status: 'Closed' } as IssueIF,
      { status: 'Resolved' } as IssueIF,
      { status: 'Open' } as IssueIF,
      { status: null } as IssueIF,
    ];
    const result = getIssueStatusList(issues);
    expect(result).toEqual(['Open', 'In Progress', 'Resolved']);
  });

  it('ignores null and Closed statuses in the input array', () => {
    const issues = [
      { status: 'Open' } as IssueIF,
      { status: null } as IssueIF,
      { status: 'Closed' } as IssueIF,
      { status: null } as IssueIF,
    ];
    const result = getIssueStatusList(issues);
    expect(result).toEqual(['Open']);
  });
});
