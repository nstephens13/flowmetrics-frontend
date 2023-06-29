<template>
    <Button class="generatePDF" label="Generate PDF" @click="generatePDF"></Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import jsPDF from 'jspdf';

const doc = new jsPDF();
const generatePDF = () => {
  doc.text('Hello world!', 10, 10);
  doc.save('a4.pdf');
};
</script>
