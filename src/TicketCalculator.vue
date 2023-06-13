<template>
<Desktop1 v-bind="desktop1Data" />
<Desktop1 :desktop1Data="desktop1Data" />
</template>

<script>
import Desktop1 from "@/components/Desktop1.vue";
import Issue from "@/path/to/Issue";

export default {
  name: 'App',
  components: {
    Desktop1,
  },
  data() {
    return { desktop1Data };
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
  span: '36',
  name: 'Open Tickets',
};

const ringImProgressData = {
  span: "24",
  name: "In Progress",
// className: "ring_im_progress",
};

const ringClosedData = {
  span: "40",
  name: "Closed Tickets",
};

const ringTotalData = {
  span: "100",
  name: "Total amount",
  className: "ring_total",
};

const thTextStart1Data = {
  span: "Ticket ID",
};

const tdTextStart1Data = {
  frozenYogurt: "2ef7bd608",
  className: "",
};

const tdTextStart2Data = {
  frozenYogurt: "7c211433",	
  className: "",
};

const tdTextStart3Data = {
  frozenYogurt: "42dfg45fgg",
  className: "",
};

const tdTextStart4Data = { 
  frozenYogurt: "2ddcgdff5",	
  className: "",
};

const tdTextStart5Data = {
  frozenYogurt: "2dgdhdft56h6",	
  className: "",
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
  span: "Status",
};

const tdTextStart6Data = {
  frozenYogurt: "In Progress",
  className: "td-text-start-20",
};

const tdTextStart7Data = {
  frozenYogurt: "Closed",
  className: "td-text-start-21",
};

const tdTextStart8Data = {
  frozenYogurt: "In Progress",
  className: "td-text-start-22",
};

const tdTextStart9Data = {
  frozenYogurt: "Open",
  className: "td-text-start-23",
};

const tdTextStart10Data = {
  frozenYogurt: "In Progress",
  className: "td-text-start-24",
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
  span: "Due Date",
};

const tdTextStart11Data = {
  frozenYogurt: "30.06.2023",
  className: "td-text-start-25",
};

const tdTextStart12Data = {
  frozenYogurt: "11.06.2023",
  className: "td-text-start-26",
};

const tdTextStart13Data = {
  frozenYogurt: "01.07.2023",
  className: "td-text-start-27",
};

const tdTextStart14Data = {
  frozenYogurt: "30.08.2023",
  className: "td-text-start-28",
};

const tdTextStart15Data = {
  frozenYogurt: "09.06.2023",
  className: "td-text-start-29",
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
  span: "Time left",
};

const tdTextStart16Data = {
  frozenYogurt: "22 days",
  className: "td-text-start-30",
};

const tdTextStart17Data = {
  frozenYogurt: "18 days",
  className: "td-text-start-31",
};

const tdTextStart18Data = {
  frozenYogurt: "24 days",
  className: "td-text-start-32",
};

const tdTextStart19Data = {
  frozenYogurt: "82 days",
  className: "td-text-start-33",
};

const tdTextStart22Data = {
  frozenYogurt: "1 days",
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
  span: "Assigned to",
};

const tdTextStart20Data = {
  frozenYogurt: "Alex Mustermann",
  className: "td-text-start-34",
};

const tdTextStart21Data = {
  frozenYogurt: "Leon Fischer",
  className: "td-text-start-35",
};

const tdTextStart23Data = {
  frozenYogurt: "Lena Hoffmann",
  className: "td-text-start-36",
};

const tdTextStart24Data = {
  frozenYogurt: "Emma Mayer",
  className: "td-text-start-37",
};

const tdTextStart25Data = {
  frozenYogurt: "Noah Weber",
  className: "td-text-start",
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
