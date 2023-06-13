<template>
  <Desktop1 v-bind="desktop1Data" />
  <div>
    <ul>
    <li v-for="(issue, index) in desktop1Data.issues" :key="issue.id">
    <h3>{{ issue.name }}</h3>
    <p>{{ issue.description }}</p>
    <p>Due Date: {{ getFormattedDate(issue) }}</p>
    <p>Time Left: {{ getTimeLeft(issue) }} days</p>
    <p>Remaining Time: {{ remainingTime[index] }} milliseconds</p>
  </li>
  </ul>
  </div>
  </template>

<script>
import Desktop1 from '@/components/Desktop1.vue';
import {
  Issue,
  getArrayOfIssues,
  getTimeLeft,
  getFormattedDate,
  getAssignedToName,
  getStatus,
  getTicketID,
}
  from '@/model/Issue.ts';

export default {
  name: 'App',
  components: {
    Desktop1,
  },
  data() {
    return {
      desktop1Data: {
        issues: [],
      },
    };
  },
  created() {
    this.desktop1Data.issues = getArrayOfIssues();
  },
  computed: {
    remainingTime() {
      return this.desktop1Data.issues.map((issue) => getFormattedDate(issue));
    },
  },
  methods: {
    getFormattedDate,
    getTimeLeft,
    getAssignedToName,
    getStatus,
    getTicketID,

  },

};

const vBtn1Data = {
  vIcon: 'menu',
};

const vBtn2Data = {
  vIcon: 'more_vert',
  className: 'v-btn-1',
};

const vToolbarContentData = {
  vApp__Title: 'FlowMetrics',
};

const vBreadcrumbsData = {
  vBreadcrumbs__Item: 'Dashboard',
  text1: '/ Tickets overview',
};

const vChipData = {
  span: 'Change time span',
};

const ringOpenData = {
  span: 24,
  name: 'Open Tickets',
};

const ringImProgressData = {
  span: 30,
  name: 'In Progress',
};

const ringClosedData = {
  span: 46,
  name: 'Closed Tickets',
};

const ringTotalData = {
  span: 100,
  name: 'Total amount',
  className: 'ring_total',
};

const thTextStart1Data = {
  span: 'Ticket ID',
};

const tdTextStart1Data = {
  frozenYogurt: getTicketID(getArrayOfIssues()[0]),
  className: '',
};

const tdTextStart2Data = {
  frozenYogurt: getTicketID(getArrayOfIssues()[1]),
  className: '',
};

const tdTextStart3Data = {
  frozenYogurt: getTicketID(getArrayOfIssues()[2]),
  className: '',
};

const tdTextStart4Data = {
  frozenYogurt: getTicketID(getArrayOfIssues()[3]),
  className: '',
};

const tdTextStart5Data = {
  frozenYogurt: getTicketID(getArrayOfIssues()[4]),
  className: '',
};

const frame1Data = {
  thTextStartProps: thTextStart1Data,
  tdTextStart1Props: tdTextStart1Data,
  tdTextStart2Props: tdTextStart2Data,
  tdTextStart3Props: tdTextStart3Data,
  tdTextStart4Props: tdTextStart4Data,
  tdTextStart5Props: tdTextStart5Data,
};

const thTextStart2Data = {
  span: 'Status',
};

const tdTextStart6Data = {
  frozenYogurt: getStatus(getArrayOfIssues()[0]),
  className: 'td-text-start-20',
};

const tdTextStart7Data = {
  frozenYogurt: getStatus(getArrayOfIssues()[1]),
  className: 'td-text-start-21',
};

const tdTextStart8Data = {
  frozenYogurt: getStatus(getArrayOfIssues()[2]),
  className: 'td-text-start-22',
};

const tdTextStart9Data = {
  frozenYogurt: getStatus(getArrayOfIssues()[3]),
  className: 'td-text-start-23',
};

const tdTextStart10Data = {
  frozenYogurt: getStatus(getArrayOfIssues()[4]),
  className: 'td-text-start-24',
};

const frame2Data = {
  thTextStartProps: thTextStart2Data,
  tdTextStart1Props: tdTextStart6Data,
  tdTextStart2Props: tdTextStart7Data,
  tdTextStart3Props: tdTextStart8Data,
  tdTextStart4Props: tdTextStart9Data,
  tdTextStart5Props: tdTextStart10Data,
};

const thTextStart3Data = {
  span: 'Due Date',
};

const tdTextStart11Data = {
  frozenYogurt: getFormattedDate(getArrayOfIssues()[0]),
  className: 'td-text-start-25',
};

const tdTextStart12Data = {
  frozenYogurt: getFormattedDate(getArrayOfIssues()[1]),
  className: 'td-text-start-26',
};

const tdTextStart13Data = {
  frozenYogurt: getFormattedDate(getArrayOfIssues()[2]),
  className: 'td-text-start-27',
};

const tdTextStart14Data = {
  frozenYogurt: getFormattedDate(getArrayOfIssues()[3]),
  className: 'td-text-start-28',
};

const tdTextStart15Data = {
  frozenYogurt: getFormattedDate(getArrayOfIssues()[4]),
  className: 'td-text-start-29',
};

const frame3Data = {
  thTextStartProps: thTextStart3Data,
  tdTextStart1Props: tdTextStart11Data,
  tdTextStart2Props: tdTextStart12Data,
  tdTextStart3Props: tdTextStart13Data,
  tdTextStart4Props: tdTextStart14Data,
  tdTextStart5Props: tdTextStart15Data,
};

const thTextStart4Data = {
  span: 'Time left',
};

const tdTextStart16Data = {
  frozenYogurt: getTimeLeft(getArrayOfIssues()[0]),
  className: 'td-text-start-30',
};

const tdTextStart17Data = {
  frozenYogurt: getTimeLeft(getArrayOfIssues()[1]),
  className: 'td-text-start-31',
};

const tdTextStart18Data = {
  frozenYogurt: getTimeLeft(getArrayOfIssues()[2]),
  className: 'td-text-start-32',
};

const tdTextStart19Data = {
  frozenYogurt: getTimeLeft(getArrayOfIssues()[3]),
  className: 'td-text-start-33',
};

const tdTextStart22Data = {
  frozenYogurt: getTimeLeft(getArrayOfIssues()[4]),
};

const frame4Data = {
  thTextStartProps: thTextStart4Data,
  tdTextStart1Props: tdTextStart16Data,
  tdTextStart2Props: tdTextStart17Data,
  tdTextStart3Props: tdTextStart18Data,
  tdTextStart4Props: tdTextStart19Data,
  tdTextStart5Props: tdTextStart22Data,
};

const thTextStart5Data = {
  span: 'Assigned to',
};

const tdTextStart20Data = {
  frozenYogurt: getAssignedToName(getArrayOfIssues()[0]),
  className: 'td-text-start-34',
};

const tdTextStart21Data = {
  frozenYogurt: getAssignedToName(getArrayOfIssues()[1]),
  className: 'td-text-start-35',
};

const tdTextStart23Data = {
  frozenYogurt: getAssignedToName(getArrayOfIssues()[2]),
  className: 'td-text-start-36',
};

const tdTextStart24Data = {
  frozenYogurt: getAssignedToName(getArrayOfIssues()[3]),
  className: 'td-text-start-37',
};

const tdTextStart25Data = {
  frozenYogurt: getAssignedToName(getArrayOfIssues()[4]),
  className: 'td-text-start',
};

const frame5Data = {
  thTextStartProps: thTextStart5Data,
  tdTextStart1Props: tdTextStart20Data,
  tdTextStart2Props: tdTextStart21Data,
  tdTextStart3Props: tdTextStart23Data,
  tdTextStart4Props: tdTextStart24Data,
  tdTextStart5Props: tdTextStart25Data,
};

const vTableData = {

  frame1Props: frame1Data,
  frame2Props: frame2Data,
  frame3Props: frame3Data,
  frame4Props: frame4Data,
  frame5Props: frame5Data,
};

const desktop1Data = {
  vToolbarContentProps: vToolbarContentData,
  vBreadcrumbsProps: vBreadcrumbsData,
  vChipProps: vChipData,
  ringClosedProps: ringClosedData,
  ringOpenProps: ringOpenData,
  ringImProgressProps: ringImProgressData,
  ringTotalProps: ringTotalData,
  vTableProps: vTableData,
};
</script>
