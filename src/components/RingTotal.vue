<template>
    <div class="ring_total {{ className || '' }}">
      <div class="overlap-group-2">
        <div class="span-5 valign-text-middle roboto-normal-navy-blue-36px">{{ span }}</div>
        <img class="ellipse-inside" src="@/assets/ellipse-inside.svg" alt="Ellipse inside" />
        <img class="ellipse-outside-4" src="@/assets/ellipse-outside-4.svg" alt="Ellipse outside" />
        <div class="name-3 valign-text-middle roboto-normal-navy-blue-24px">{{ name }}</div>
      </div>
    </div>
  </template>

<script>
export default {
    name: "RingTotal",
    props: ["span", "name", "className"],
};
</script>


<style>
  .ring_total {
    align-items: flex-start;
    display: flex;
    height: 500px;
    margin-left: 70px;
    min-width: 164px;
    position: fixed;
    bottom: -100px; 
    left: calc(50% + 545px);
    transform: translateX(-50%);
  } 

  .span-5 {
    height: 85px;
    left: 42px;
    letter-spacing: 0.5px;
    line-height: 24px;
    position: absolute;
    text-align: center;
    top: 32px;
    width: 81px;
} 

 .ellipse-outside-4 {
    height: 150px;
    left: 11px;
    position: absolute;
    top: 0px;
    width: 142px;
}

.name-3 {
    height: 40px;
    left: 0;
    letter-spacing: 0.5px;
    line-height: 24px;
    position: absolute;
    text-align: center;
    top: 149px;
    width: 164px;
} 

</style>