<template>
    <div class="ring_im_progress {{ className || '' }}">
      <div class="overlap-group1">
        <div class="span-2 valign-text-middle roboto-normal-navy-blue-36px">{{ span }}</div>
        <img class="ellipse-inside-1" src="@/assets/ellipse-inside-1.svg" alt="Ellipse inside" />
        <img class="ellipse-outside-2" src="@/assets/ellipse-outside-2.svg" alt="Ellipse outside" />
        <div class="name-1 valign-text-middle roboto-normal-navy-blue-24px">{{ name }}</div>
      </div>
    </div>
  </template>
  

<script>
export default {
    name: "RingImProgress",
    props: ["span", "name","className"],
};
</script>

<style>
.ring_im_progress {
  align-items: flex-start;
    display: flex;
    height: 333px;
    margin-left: 70px;
    min-width: 164px;
    position: fixed;
    bottom: -100px; 
    left: calc(50% + 400px);
    transform: translateX(-50%);
}

.span-2 {
    height: 85px;
    left: 42px;
    letter-spacing: 0.5px;
    line-height: 24px;
    position: absolute;
    text-align: center;
    top: 32px;
    width: 81px;
}

.ellipse-inside-1 {
    height: 75px;
    left: 11px;
    position: absolute;
    top: 75px;
    width: 68px;
}

.ellipse-outside-2 {
    height: 150px;
    left: 11px;
    position: absolute;
    top: 0px;
    width: 142px;
}

.name-1 {
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





