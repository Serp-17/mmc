<script setup>
import { BFly, Info, Internal, Cassettes, Saw1, Saw2, Wek, Parapet, JoistPrep, WindowStation } from './Stations';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const { query, params } = useRoute();
const router = useRouter();
const stations = ['Info', 'Saw1', 'Saw2', 'Wek', 'B-Fly', 'Joist Prep', 'Cassettes', 'Window Station', 'Internal', 'Parapet'];
const station = ref(null);
const store = useStore();

const panel = computed(() => store.getters['panels/getPanel']);

const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
const breadcrumbItems = computed(() => {
    if (!panel.value) return [];
    return [{ label: 'Volume', url: `/volumes/${panel.value.volume_id}` }, { label: 'Panels', url: `/panels/${panel.value.volume_id}` }, { label: 'Panels name' }];
});

const selectPage = (str) => {
    station.value = str;
    router.push({
        query: {
            station: str
        }
    });
};

onMounted(() => {
    if (query.station) {
        station.value = query.station;
    } else if (station.value === null) {
        station.value = stations[0];
    }
    store.dispatch('panels/fetchPanelById', params.id);
});

watch(panel, (newPanel) => {
    if (!newPanel) {
        console.warn('Panel data is not loaded yet.');
    }
});
</script>

<template>
    <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems"/>
    <div class="card mt-8">
        <div class="font-semibold text-xl mb-4">
            Panel - {{ panel?.name || 'Loading...' }}
            <span class="text-gray-400">( {{ panel?.tracking_number || '...' }} )</span>
        </div>

        <Tabs :value="station">
            <TabList>
                <Tab v-for="item in stations" :key="item" :value="item" @click="selectPage(item)">
                    {{ item }}
                </Tab>
            </TabList>
        </Tabs>
    </div>

    <div v-if="panel">
        <Info v-if="station === 'Info'" :panel_status="panel.status" :links="panel.link" />
        <Saw1 v-if="station === 'Saw1'" :id_panel="params.id" />
        <Saw2 v-if="station === 'Saw2'" />
        <Wek v-if="station === 'Wek'" />
        <BFly v-if="station === 'B-Fly'" />
        <Cassettes v-if="station === 'Cassettes'" />
        <Internal v-if="station === 'Internal'" />
        <Parapet v-if="station === 'Parapet'" />
        <JoistPrep v-if="station === 'Joist Prep'" />
        <WindowStation v-if="station === 'Window Station'" />
    </div>
</template>
