import { describe, expect } from 'vitest';
import type { IssueIF } from '../IssueIF';
import type { SLARule } from '@/model/SLARule';
import { test } from 'vitest';
import {
  Issue,
  getSLARules
} from '../Issue';


test('getSLARules returns an empty array when assignedSLARule is null', () => {
    const issue = new Issue(
        1,
        'Test Issue',
        null,
        null,
        {
            id: 1,
            firstName: 'Anna',
            lastName: 'John',
          },
        new Date(),
        null,
        null,
        'Open',
        null,
        null
    );

    const slarules = getSLARules(issue, null);
    expect(slarules).toEqual([]);
  });

  describe('assignedSLARules', () => {
    test('returns assigned SLARules when assignedSLARules is not null', () => {
        const slarules: SLARule[] = [
            {
              id: 100,
              name: 'rulenumber1',
              durationInDays: null,
              expirationDate: null,
              maxAssignedEmployees: null,
              occurredIn: null,
            },
            {
              id: 200,
              name: 'rulenumber2',
              durationInDays: null,
              expirationDate: null,
              maxAssignedEmployees: null,
              occurredIn: null,
            },
          ];
      
          const issue: IssueIF = {
            id: 1,
            name: 'Test Issue',
            description: null,
            assignedTo: null,
            createdBy: {
              id: 2,
              firstName: 'Mary',
              lastName: 'Gard',
            },
            createdAt: new Date(),
            closedAt: null,
            dueTo: null,
            status: 'Open',
            statusChanges: null,
            assignedSLARule: slarules,
          };
      
          const assignedSLARules = issue.assignedSLARule;
          expect(assignedSLARules).toEqual(slarules);
        });
      });