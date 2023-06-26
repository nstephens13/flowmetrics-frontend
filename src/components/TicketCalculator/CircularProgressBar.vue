<template>
  <div class="flex flex-column card-container">
    <div class="circle-progress">
      <svg class="circle-progress__svg" viewBox="0 0 104 104" width="104" height="104">
        <circle
          class="circle-progress__circle circle-progress__line--back"
          :r="radius"
          cx="52"
          cy="52"
        />
        <circle
          class="circle-progress__circle circle-progress__line--top"
          :class="fillingCircleClasses"
          :style="fillingCircleStyles"
          ref="fillingCircle"
          :r="radius"
          cx="52"
          cy="52"
          transform="rotate(-270 52 52)"
        />
      </svg>

      <div class="circle-progress__content">
        <span v-if="percentage" class="circle-progress__percentage">
          {{ getPercentage }}
        </span>
        <slot></slot>
      </div>
    </div>
    <p>{{ title }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  max: {
    type: Number,
    required: true,
    default: 100
  },

  value: {
    type: Number,
    required: true,
    default: 0
  },

  colorFilled: {
    type: String,
    required: false,
    default: '#2196f3'
  },

  colorUnfilled: {
    type: String,
    required: false,
    default: '#2196f3'
  },

  percentage: {
    type: Boolean,
    required: false,
    default: false
  },

  rounded: {
    type: Boolean,
    required: false,
    default: false
  },

  animationDuration: {
    type: String,
    required: false,
    default: '0.5s'
  },

  strokeWidth: {
    type: String,
    required: false,
    default: '5px'
  },

  reversedFilling: {
    type: Boolean,
    required: false,
    default: false
  }
})

const isLimitReached = computed(() => props.max <= props.value)
const fillingCircleClasses = computed(() => ({
  'circle-progress__line--top--rounded': props.rounded,
  'circle-progress__line--filled': isLimitReached.value,
  'circle-progress__line--unfilled': !isLimitReached.value
}))

const currentFormatted = computed(() => (isLimitReached.value ? props.max : props.value))

const fillingCircle = ref(null)
const radius = ref(48)
const dashArray = computed(() => radius.value * Math.PI * 2)
const dashOffset = computed(() => {
  if (props.reversedFilling) {
    return dashArray.value - (dashArray.value * (props.max - currentFormatted.value)) / props.max
  }
  return dashArray.value - (dashArray.value * currentFormatted.value) / props.max
})

const getPercentage = computed(() => `${Math.floor((props.value / props.max) * 100)}%`)

const fillingCircleStyles = computed(() => ({
  strokeDashoffset: dashOffset.value,
  strokeDasharray: dashArray.value
}))
</script>

<style>
@keyframes filling {
  from {
    stroke-dashoffset: v-bind('dashArray');
  }
  to {
    stroke-dashoffset: v-bind('dashOffset');
  }
}

.circle-progress__circle {
  fill: transparent;
  stroke-width: v-bind('props.strokeWidth');
}

.circle-progress__line--back {
  stroke: #eceef1;
  stroke-dashoffset: 0;
}

.circle-progress__line--top {
  animation-name: filling;
  animation-duration: v-bind('props.animationDuration');
  animation-timing-function: ease-in;
  transition: 0.5s all;
}

.circle-progress__line--top--rounded {
  stroke-linecap: round;
}

.circle-progress {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}

.circle-progress__line--filled {
  stroke: v-bind('props.colorFilled');
}

.circle-progress__line--unfilled {
  stroke: v-bind('props.colorUnfilled');
}

.circle-progress__content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
