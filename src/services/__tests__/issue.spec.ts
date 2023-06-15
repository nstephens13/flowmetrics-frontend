import {
  assert, expect, test, describe,
} from 'vitest';
import type { EmployeeIF } from '../../model/EmployeeIF';
import type { IssueIF } from '../../model/IssueIF';
import type { Issue } from '../../model/Issue';

// when getArrayofIssues and Issue out of the static data should be created

test('getArrayofIssues', () => {
  const arrayOfIssues = getArrayofIssues();

  assert(Array.isArray(arrayOfIssues));
});
// so?? :D

// when  const array : map method should ransform array of IssueIF objects into Issue objects

// when getAssignedname() function should return name of the adressed issue's assignie

// when getStatus function should return current status of adressed issue

// when getTicketID function should return ticket ID of adressed Issue

// when getFormattedDate should take due-to object of Issue and transforms it to desplayable date

// when getTimeLeft should calculate and give back days left until due date

// when countIssuesbystatus make an array out of status and count the length

// when countOpenIssues takes helper function and counts open issue, give back number

// when countClosedIssues takes helper function and counts open issue, give back number

// when countInProgressIssues takes helper function and counts open issue, give back number
