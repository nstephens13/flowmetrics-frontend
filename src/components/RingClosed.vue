<template>
    <div class="ring_closed {{ className || '' }}">
      <div class="overlap-group-1">
        <div class="span-3 valign-text-middle roboto-normal-navy-blue-36px">{{ span }}</div>
        <img class="ellipse-inside-2" src="@/assets/ellipse-inside-2.svg" alt="Ellipse inside" />
        <img class="ellipse-outside-3" src="@/assets/ellipse-outside-3.svg" alt="Ellipse outside" />
        <div class="name-2 valign-text-middle roboto-normal-navy-blue-24px">{{ name }}</div>
      </div>
    </div>
</template>
  


<script>
export default {
    name: "RingClosed",
    props: ["span", "name", "className"],
};
</script>

<style>
.ring_closed {
    align-items: flex-start;
    display: flex;
    height: 500px;
    margin-left: 70px;
    min-width: 164px;
    position: fixed;
    bottom: -100px; 
    left: calc(50% + 400px);
    transform: translateX(-50%);
}

.span-3 {
  height: 85px;
  left: 42px;
  letter-spacing: 0.5px;
  line-height: 24px;
  position: absolute;
  text-align: center;
  top: 32px;
  width: 81px;
} 

.ellipse-inside-2 {
  height: 75px;
  left: 11px;
  position: absolute;
  top: 75px;
  width: 129px;
}

.ellipse-outside-3 {
  height: 150px;
  left: 11px;
  position: absolute;
  top: 0px;
  width: 142px;
}

.name-2 {
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










