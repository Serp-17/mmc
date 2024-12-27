<script setup>
import { ref, onMounted, computed } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useStore } from 'vuex';

const store = useStore();
const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
const breadcrumbItems = ref([{ label: 'Volume name', url: '/volumes/1' }, { label: 'Panels' }]);
const loading = ref(true);
const panels = computed(() => store.getters['panels/getPanels']);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    tracking_number: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_completed: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    date_shipped: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
});

const statuses = ['null', 'done', 'qa', 'In progress'];

const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';
        case 'done':
            return 'success';
        case 'qa':
            return 'info';
        case 'in progress':
            return 'warn';
        case null:
            return null;
    }
};

onMounted(() => {
    store.dispatch('panels/fetchPanels', 1).then(() => (loading.value = false));
});
</script>

<template>
    <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
    <div class="card mt-8">
        <DataTable v-model:filters="filters" :value="panels" paginator :rows="10" dataKey="id" filterDisplay="row" :loading="loading" :globalFilterFields="['name', 'tracking_number']">
            <template #header>
                <div class="flex justify-between items-center">
                    <div class="font-semibold text-xl">
                        Volume name
                    </div>
                    <div class="flex justify-end">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                        </IconField>
                    </div>
                </div>
            </template>
            <template #empty> No panels found. </template>
            <template #loading> Loading panels data. Please wait. </template>
            <Column field="id" header="ID" style="width: 60px" sortable>
                <template #body="{ data }">
                    {{ data.id }}
                </template>
            </Column>
            <Column field="name" header="Panel Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="tracking_number" header="Tracking Number" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.tracking_number }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="date_completed" header="Date Completed" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.date_completed }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="date_shipped" header="Date Shipped" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.date_shipped }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="status" header="Status" :showFilterMenu="false" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag class="uppercase" :value="data.status" :severity="getSeverity(data.status)" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
