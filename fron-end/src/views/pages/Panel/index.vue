<script setup>
import { BFly, Info, Internal, Cassettes, Saw1, Saw2, Wek, Parapet, JoistPrep, WindowStation } from './Stations';

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { query } = useRoute();
const router = useRouter();
const stations = ['Info', 'Saw1', 'Saw2', 'Wek', 'B-Fly', 'Joist Prep', 'Cassettes', 'Window Station', 'Internal', 'Parapet'];
const station = ref(null);

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
});
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">Panel - EP3333 <span class="text-gray-400">( RO000 )</span></div>
        <Tabs :value="station">
            <TabList>
                <Tab v-for="item in stations" :key="item" :value="item" @click="selectPage(item)">{{ item }}</Tab>
            </TabList>
        </Tabs>
    </div>
    <div>
        <Info v-if="station === 'Info'" />
        <Saw1 v-if="station === 'Saw1'" />
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
