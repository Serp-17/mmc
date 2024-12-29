<script setup>
import { StatsWidget, NotificationsWidget, ChartPie, PanelsVolumeWidget, PanelsInProgressWidget } from '@/components/mmc';
import { getColors } from '@/consts/colors';
import { useStore } from 'vuex';
import { onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();
const store = useStore();
const pieData = ref(null);
const pieOptions = ref(null);
const panels = computed(() => store.getters['panels/getInProgressPanels']);
const panelsStatistic = computed(() => store.getters['panels/getPanelsStatistic']);
const labelsPie = ref(null);
const dataPie = ref(null);

onMounted(() => {
    store.dispatch('panels/fetchInProgressPanels', params.id);
    store.dispatch('panels/fetchPanelsStatistic', params.id);
});

const setColorOptions = (labels, data) => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    pieData.value = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: getColors(labels, '--p-').map((color) => documentStyle.getPropertyValue(color))
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
    [panelsStatistic],
    () => {
        if (panelsStatistic.value) {
            dataPie.value = panelsStatistic.value.panelTypes.map((item) => item.count);
            labelsPie.value = panelsStatistic.value.panelTypes.map((item) => item.type);
            setColorOptions(
                panelsStatistic.value.panelTypes.map((item) => item.type),
                panelsStatistic.value.panelTypes.map((item) => item.count)
            );
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <StatsWidget v-if="panelsStatistic" :totalPanels="panelsStatistic.totalPanels" :panelDone="panelsStatistic.panelDone" />
        <div class="col-span-12 xl:col-span-6">
            <PanelsVolumeWidget :panels="panels" />
            <PanelsInProgressWidget :panelsStatistic="panelsStatistic" />
        </div>
        <div class="col-span-12 xl:col-span-6">
            <ChartPie v-if="panelsStatistic" :pieData="pieData" :pieOptions="pieOptions" />
            <NotificationsWidget />
        </div>
    </div>
</template>
