<template>
    <div class="ring_open {{ className || '' }}">
      <div class="overlap-group">
        <div class="span-1 valign-text-middle roboto-normal-navy-blue-36px">{{ span }}</div>
        <img class="ellipse-inside" src="@/assets/ellipse-inside.svg" alt="Ellipse inside" />
        <img class="ellipse-outside" src="@/assets/ellipse-outside.svg" alt="Ellipse outside" />
        <div class="name valign-text-middle roboto-normal-navy-blue-24px">{{ name }}</div>
      </div>
    </div>
  </template>
  

<script>
export default {
    name: "RingOpen",
    props: ["span", "name", "className"],
};
</script>

<style>

.ring_open {
  align-items: flex-start;
  display: flex;
  height: 300px;
  margin-top: 30px;
  margin-right: 110px;
  min-width: 164px;
  position: fixed;
  top: 30px;
  right: 20px;
} 
  
   .span-1 {
    height: 85px;
  left: 42px;
  letter-spacing: 0.5px;
  line-height: 24px;
  position: absolute;
  text-align: center;
  top: 32px;
  width: 81px;
  }
  
  .ellipse-inside {
    height: 75px;
  left: 5px;
  position: absolute;
  top: 75px;
  width: 129px;
  }
  
  .ellipse-outside {
    height: 150px;
  left: 11px;
  position: absolute;
  top: 0px;
  width: 142px;
  }
  
  .name {
    height: 40px;
  left: 0;
  letter-spacing: 0.5px;
  line-height: 24px;
  position: absolute;
  text-align: center;
  top: 140px;
  width: 164px;
  } 
  
  </style>
     
        