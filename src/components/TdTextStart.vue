<template>
	<div :class="['td-text-start-15', className || '']">
		<div class="fronzen-yogurt-1 valign-text-middle robot-normal-black-14px">{{ frozenYogurt }} 
        </div>		
	</div>
</template>

<script>
	export default {
		name: "TdTextStart",
		props: ["frozenYogurt", "className"],
	};
</script>

<style>
	.td-text-start-15 {
		align-items: center;
		align-self: stretch;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px  #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		padding: 10px 16px;
		position: relative;
	}

	.frozen-yogurt-1 {
		align-self: stretch;
		flex: 1;
		letter-spacing: 0.25px;
		line-height: 20px;
		margin-top: -1px;
		position: relative;
		text-decoration: underline;
	}

	.td-text-start-15.td-text-start-20 .frozen-yogurt-1 {
		align-self: unset;
		flex: unset;
		margin-top: unset;
		text-decoration: unset;
		white-space: nowrap;
		width: fit-content;
	}
	
	.td-text-start-15.td-text-start-21 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-22 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-23 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-24 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-25 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-26 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-27 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-28 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-29 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-30 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-31 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-32 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-33 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-34 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-35 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-36 .frozen-yogurt-1,
	.td-text-start-15.td-text-start-37 .frozen-yogurt-1,
	.td-text-start-15.td-text-start .frozen-yogurt-1,
	.td-text-start-15.td-text-start-1 .frozen-yogurt-1
	.td-text-start-15.td-text-start-2 .frozen-yogurt-1
	.td-text-start-15.td-text-start-7 .frozen-yogurt-1
	.td-text-start-15.td-text-start-8 .frozen-yogurt-1
	.td-text-start-15.td-text-start-9 .frozen-yogurt-1
	.td-text-start-15.td-text-start-10 .frozen-yogurt-1
	.td-text-start-15.td-text-start-11 .frozen-yogurt-1
	.td-text-start-15.td-text-start-12 .frozen-yogurt-1
	.td-text-start-15.td-text-start-13 .frozen-yogurt-1
	.td-text-start-15.td-text-start-14 .frozen-yogurt-1 
	{
		text-decoration: unset;
	}

	.td-text-start-15.td-text-start-1 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 987px;
		padding: 10px 16px;
		position: absolute;
		top: 337px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-2 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 43px;
		left: 987px;
		padding: 10px 16px;
		position: absolute;
		top: 392px;
		width: 216px;
	}

	.td-text-start-15.td-text-start-2 .frozen-yogurt-1 {
		text-decoration: unset;
		white-space: nowrap;
	}

	.td-text-start-15.td-text-start-3 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 985px;
		padding: 10px 16px;
		position: absolute;
		top: 435px;
		width: 226px;
	}


	.td-text-start-15.td-text-start-4 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 46px;
		left: 85px;
		padding: 10px 16px;
		position: absolute;
		top: 339px;
		width: 226px;
	}

	.td-text-start-15.td-text-start-5 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 85px;
		padding: 10px 16px;
		position: absolute;
		top: 387px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-6 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 85px;
		padding: 10px 16px;
		position: absolute;
		top: 435px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-7 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 761px;
		padding: 10px 16px;
		position: absolute;
		top: 337px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-8 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 760px;
		padding: 10px 16px;
		position: absolute;
		top: 387px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-9 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 535px;
		padding: 10px 16px;
		position: absolute;
		top: 337px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-10 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 535px;
		padding: 10px 16px;
		position: absolute;
		top: 387px;
		width: 229px;
	}

	.td-text-start-15.td-text-start-11 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 535px;
		padding: 10px 16px;
		position: absolute;
		top: 435px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-12 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 46px;
		left: 310px;
		padding: 10px 16px;
		position: absolute;
		top: 339px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-13 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 310px;
		padding: 10px 16px;
		position: absolute;
		top: 387px;
		width: 225px;
	}

	.td-text-start-15.td-text-start-14 {
		align-items: center;
		background-color: var(--white);
		box-shadow: inset 0px -1px 0px #0000001f;
		display: flex;
		gap: 10px;
		height: 48px;
		left: 310px;
		padding: 10px 16px;
		position: absolute;
		top: 435px;
		width: 225px;
	}
</style>










		








	
	