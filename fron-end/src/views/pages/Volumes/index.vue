<script setup>
import Img from '@/assets/LWP15068-Enhanced-NR-Edit.webp';
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const volumes = computed(() => store.getters['volumes/getVolumes']);
onMounted(() => {
    store.dispatch('volumes/fetchVolumes');
});

const getSeverity = (status) => {
    switch (status) {
        case 'done':
            return 'success';
        case 'planned':
            return 'info';
        case 'in progress':
            return 'warning';
        default:
            return null;
    }
};
</script>

<template>
    <div class="card">
        <div class="flex items-center justify-between mb-10">
            <div class="font-semibold text-xl">Volumes</div>
            <Button as="router-link" label="Add new" to="/volumes/add"></Button>
        </div>
        <div class="grid grid-cols-3">
            <div v-for="(item, index) in volumes" :key="index" class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                <div class="mb-4">
                    <div class="relative mx-auto h-80 flex">
                        <img :src="Img" :alt="item.name" class="w-full rounded object-fill" />
                        <div class="dark:bg-surface-900 absolute rounded-border" style="left: 5px; top: 5px">
                            <Tag class="uppercase" :value="item.status" :severity="getSeverity(item.status)" />
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="font-medium">{{ item.name }}</div>
                    <span class="flex gap-4">
                        <Button as="router-link" :to="`/volumes/${item.id}`" icon="pi pi-eye" />
                        <Button as="a" target="_blank" :href="item.link" icon="pi pi-folder-open" severity="secondary" outlined />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
