import { describe, test, expect } from 'vitest';
import {
  getTimeLeft, getFormattedDate, getAssignedToName,
} from '@/model/Issue';
import getMockData from '@/assets/__mockdata__/mockDataComposer';

describe('Issue Tests', () => {
  test('getArrayOfIssues should return an array of Issue objects', () => {
    const project = getMockData(5);
    expect(Array.isArray(project.issues)).toBeTruthy();
    expect(project.issues.length > 0).toBeTruthy();
    expect(project.issues[0].id).toEqual(14898);
    expect(project.issues[0].name).toEqual('Issue 1');
    // Add more assertions for other properties if needed
  });
  test('getTimeLeft should return the number of days left until due date', () => {
    const issue = getMockData(5).issues[0]; // Assuming the first issue has a due date
    const timeLeft = getTimeLeft(issue);
    expect(timeLeft).not.toBeNull();
    expect(typeof timeLeft).toBe('number');
  });

  test('getFormattedDate should return a formatted string of the due date', () => {
    const issue = getMockData(5).issues[0]; // Assuming the first issue has a due date
    const formattedDate = getFormattedDate(issue);
    expect(typeof formattedDate).toBe('string');
    // Add assertions for the expected format of the date string
  });

  test('getAssignedToName should return the full name of the assigned employee', () => {
    const issue = getMockData(5).issues[1]; // Assuming the second issue has an assigned employee
    const assignedToName = getAssignedToName(issue);
    expect(typeof assignedToName).toBe('string');
    // Add assertions for the expected full name
  });

  test('getStatus should return the status of the issue', () => {
    const issue = getMockData(5).issues[7]; // Assuming the first issue has a status
    expect(issue.status).not.toBeNull();
    expect(typeof issue.status).toBe('string');
  });

  test('getTicketID should return the ID of the issue', () => {
    const issue = getMockData(5).issues[0]; // Assuming the first issue has an ID
    const ticketID = issue.id;
    expect(typeof ticketID).toBe('number');
  });
});
