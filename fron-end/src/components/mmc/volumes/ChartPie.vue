<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
    pieData: Object,
    pieOptions: Object
});
</script>

<template>
    <div class="card">
        <div class="col-span-12 xl:col-span-6">
            <div class="card flex flex-col items-center">
                <Chart type="pie" :data="props.pieData" :options="props.pieOptions"></Chart>
            </div>
        </div>
    </div>
</template>
