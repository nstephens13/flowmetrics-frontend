<template>
<div class="v-chip">
    <div class="span vlign-text-middle">{{ span }}
    </div>
</div>
</template>

<script>
export default {
    name: "VChip",
    props: ["span"],
};
</script>

<style>
.vchip {
    align-items: center;
    background-color: var(--navy-blue);
    border-radius: 10px;
    display: flex;
    gap: 6px;
    height: 48px;
    left: 1098px;
    overflow: hidden;
    padding: obsolute;
    top: 605px;
    width: 136px;
}

.span {
    color: var(--white);
    font-family: var(--font-family-roboto);
    font-size: var(--font-size-s);
    font-weight: 400;
    letter-spacing: 0;
    line-height: 20px;
    position: relative;
    text-align: center;
    white-space: nowrap;
    width: fit-content;
}
</style>