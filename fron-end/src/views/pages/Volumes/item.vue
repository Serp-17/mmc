<script setup>
import { StatsWidget, NotificationsWidget, ChartPie, PanelsVolumeWidget, PanelsInProgressWidget } from '@/components/mmc';
import { useLayout } from '@/layout/composables/layout';
import { getColors } from '@/consts/colors';
import { useStore } from 'vuex';
import { onMounted, ref, watch, computed } from 'vue';

const store = useStore();
const { getPrimary, getSurface, isDarkTheme } = useLayout();
const pieData = ref(null);
const pieOptions = ref(null);
const panels = computed(() => store.getters['panels/getInProgressPanels']);
const panelsStatistic = computed(() => store.getters['panels/getPanelsStatistic']);
const labels = ref(['FC', 'EP', 'IP', 'RC', 'RU', 'PP', 'PW']);

onMounted(() => {
    setColorOptions();
    store.dispatch('panels/fetchInProgressPanels');
    store.dispatch('panels/fetchPanelsStatistic');
});

const setColorOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    pieData.value = {
        labels: labels.value,
        datasets: [
            {
                data: [540, 325, 702, 300, 300, 200, 200],
                backgroundColor: getColors(['FC', 'EP', 'IP', 'RC', 'RU', 'PP', 'PW'], '--p-').map((color) => documentStyle.getPropertyValue(color))
            }
        ]
    };

    pieOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};

watch(
    [getPrimary, getSurface, isDarkTheme],
    () => {
        setColorOptions();
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <StatsWidget />
        <div class="col-span-12 xl:col-span-6">
            <PanelsVolumeWidget :panels="panels" />
            <PanelsInProgressWidget :panelsStatistic="panelsStatistic" />
        </div>
        <div class="col-span-12 xl:col-span-6">
            <ChartPie :pieData="pieData" :pieOptions="pieOptions" />
            <NotificationsWidget />
        </div>
    </div>
</template>
