<script setup>
import { defineProps } from 'vue';
import { colors } from '@/consts/colors';

const props = defineProps({
    panelsStatistic: Object
});

const calculateProgress = (total, completed) => {
    if (total === 0) return 0;
    return Math.trunc((completed / total) * 100);
};
</script>

<template>
    <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Progress panels</div>
        </div>
        <ul v-if="props.panelsStatistic" class="list-none p-0 m-0">
            <li v-for="(item, index) in props.panelsStatistic.panelTypes" :key="index" class="flex flex-col md:flex-row md:items-center md:justify-between py-4 border-b border-surface">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">{{ item.type }}</span>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div :class="`bg-${colors[index]}`" class="h-full" :style="`width: ${calculateProgress(item.count, item.panelDone)}%`"></div>
                    </div>
                    <span :class="`text-${colors[index]}`" class="ml-4 font-medium">%{{ calculateProgress(item.count, item.panelDone) }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
