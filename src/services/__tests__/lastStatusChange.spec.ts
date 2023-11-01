import { describe, expect, test } from 'vitest';
import extractLastStatusChange from '../lastStatusChangeCalculator';

describe('functionReturnsRightValues', () => {
  test('typeCheckShouldFail', () => {
    const compareObject = { name: 'something' };
    expect(extractLastStatusChange(JSON.stringify(compareObject)).valueOf()).toEqual(0);
  });
  test('noStatusChangesDetected', () => {
    const compareObject = {
      expand: 'something',
      id: 'something',
      self: 'something',
      key: 'something',
      renderedFields: 'something',
      names: 'something',
      schema: 'something',
      operations: 'something',
      editmeta: 'something',
      changelog: 'something',
      versionedRepresentations: 'something',
    };
    expect(extractLastStatusChange(JSON.stringify(compareObject)).valueOf()).toEqual(1);
  });
  test('detectsLastStatusChange', () => {
    const compareObject = {
      expand: 'something',
      id: 'something',
      self: 'something',
      key: 'something',
      renderedFields: 'something',
      names: 'something',
      schema: 'something',
      operations: 'something',
      editmeta: 'something',
      changelog: {
        total: 1,
        histories: [
          {
            created: new Date(42),
            items: [
              {
                field: 'status',
              },
            ],
          },
        ],
      },
      versionedRepresentations: 'something',
    };
    expect(extractLastStatusChange(JSON.stringify(compareObject)).valueOf()).toEqual(42);
  });
  test('moreStatusChangesPickRightOne', () => {
    const compareObject = {
      expand: 'something',
      id: 'something',
      self: 'something',
      key: 'something',
      renderedFields: 'something',
      names: 'something',
      schema: 'something',
      operations: 'something',
      editmeta: 'something',
      changelog: {
        total: 3,
        histories: [
          {
            created: new Date(100),
            items: [
              {
                field: 'status',
              },
            ],
          },
          {
            created: new Date(42),
            items: [
              {
                field: 'status',
              },
            ],
          },
          {
            created: new Date(10),
            items: [
              {
                field: 'something',
              },
              {
                field: 'status',
              },
              {
                field: 'something',
              },
            ],
          },
        ],
      },
      versionedRepresentations: 'something',
    };
    expect(extractLastStatusChange(JSON.stringify(compareObject)).valueOf()).toEqual(10);
  });
  test('skipIfNotStatusChange', () => {
    const compareObject = {
      expand: 'something',
      id: 'something',
      self: 'something',
      key: 'something',
      renderedFields: 'something',
      names: 'something',
      schema: 'something',
      operations: 'something',
      editmeta: 'something',
      changelog: {
        total: 3,
        histories: [
          {
            created: new Date(100),
            items: [
              {
                field: 'status',
              },
            ],
          },
          {
            created: new Date(42),
            items: [
              {
                field: 'status',
              },
            ],
          },
          {
            created: new Date(10),
            items: [
              {
                field: 'something',
              },
              {
                field: 'something',
              },
              {
                field: 'something',
              },
            ],
          },
        ],
      },
      versionedRepresentations: 'something',
    };
    expect(extractLastStatusChange(JSON.stringify(compareObject)).valueOf()).toEqual(42);
  });

  test('typeCheckFails', () => {
    const compareObject = {
      expand: 'something',
      id: 'something',
      self: 'something',
      key: 'something',
      renderedFields: 'something',
      names: 'something',
      schema: 'something',
      operations: 'something',
      editmeta: 'something',
      changelog: 'something',
    };
    expect(extractLastStatusChange(JSON.stringify(compareObject)).valueOf()).toEqual(0);
  });
});
