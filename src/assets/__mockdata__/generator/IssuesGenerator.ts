import { faker } from '@faker-js/faker';
import type { IssueIF } from '@/model/Issue/IssueIF';
import {
  getWorkflow,
  getRandomEmployee,
  getRandomInt,
  getDateAndTimeInPast,
  getRandomIntBetween,
} from '@/assets/__mockdata__/generator/HelperFunctions';
import { generateAssigneeChanges, generateStatusChanges } from './ChangeLogGenerator';
import type { EmployeeIF } from '@/model/EmployeeIF';
import { Category, getCategory, statusLists } from '../IssueProps/statusLists';
import getTimeDifference from '@/services/timeCalculator';
import IssueTypes from '../IssueProps/issueTypes';
import Priority from '../IssueProps/priority';

function getIssue(issueNumber: number, issueTypeNumber: number): IssueIF {
  const issueType = Object.keys(IssueTypes)[issueTypeNumber];
  const workflow = getWorkflow(issueType);
  const issueStatus: string =
    issueType === IssueTypes.zombie
      ? workflow.statuses[getRandomIntBetween(9, 14)].status
      : workflow.statuses[getRandomInt(workflow.statuses.length)].status;
  const createdDate: Date =
    issueType === IssueTypes.zombie
      ? faker.date.past({ refDate: getDateAndTimeInPast(30) })
      : faker.date.past({ refDate: getDateAndTimeInPast(4) });
  const assignedEmployee: EmployeeIF = getRandomEmployee();
  const generatedStatusChanges = generateStatusChanges(
    issueType,
    issueNumber,
    issueStatus,
    createdDate
  );
  const generatedAssigneeChanges = generateAssigneeChanges(
    issueType,
    issueNumber,
    assignedEmployee,
    createdDate
  );
  const statusRestingTime =
    generatedStatusChanges === null
      ? null
      : getTimeDifference(generatedStatusChanges[generatedStatusChanges.length - 1]);
  const assigneeRestingTime =
    generatedAssigneeChanges === null
      ? null
      : getTimeDifference(generatedAssigneeChanges[generatedAssigneeChanges.length - 1]);
  const closedDate: Date | null =
    statusLists[Category.nonDisplayed].includes(issueStatus) && generatedStatusChanges
      ? generatedStatusChanges[generatedStatusChanges.length - 1]?.created
      : null;
  const state = getCategory(issueStatus);
  return {
    id: issueNumber,
    name: `${faker.hacker.adjective()}`,
    description: `${faker.hacker.phrase()}`,
    assignedTo: assignedEmployee,
    issueType,
    priority: faker.helpers.arrayElement(Object.keys(Priority)),
    createdBy: getRandomEmployee(),
    createdAt: createdDate,
    closedAt: closedDate,
    dueTo: faker.date.future(),
    status: issueStatus,
    statusChanges: generatedStatusChanges,
    assigneeChanges: generatedAssigneeChanges,
    assigneeRestingTime,
    statusRestingTime,
    assignedSlaRule: null,
    state,
  } as IssueIF;
}

export default function generateIssues(projectId: number, numberOfIssues: number): IssueIF[] {
  const issues: IssueIF[] = [];
  for (let i = 1; i <= numberOfIssues; i++) {
    const issueId = projectId * 100 + i;
    issues.push(getIssue(issueId, getRandomInt(Object.keys(IssueTypes).length)));
  }
  return issues;
}
