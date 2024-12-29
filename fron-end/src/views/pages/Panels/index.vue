<script setup>
import { ref, onMounted, computed } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const { params } = useRoute();
const store = useStore();
const toast = useToast();
const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
const breadcrumbItems = ref([{ label: 'Volume', url: `/volumes/${params.id}` }, { label: 'Panels' }]);
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

const statuses = ['done', 'qa', 'in progress'];
const display = ref(false);
const selectedId = ref(null);
const modelSelect = ref(null);

const open = (id) => {
    const status = panels.value.find((item) => item.id === id).status;
    selectedId.value = id;
    modelSelect.value = status;
    display.value = true;
};

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

const editStatus = () => {
    const data = {
        status: modelSelect.value
    };
    store.dispatch('panels/putPanel', { id: selectedId.value, data: data }).then(() => {
        store.dispatch('panels/fetchPanels', params.id).then(() => (loading.value = false));
        selectedId.value = null;
        modelSelect.value = null;
        display.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Status update', life: 3000 });
    });
};

onMounted(() => {
    store.dispatch('panels/fetchPanels', params.id).then(() => (loading.value = false));
});
</script>

<template>
    <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

    <Dialog header="Change status" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <Select v-model="modelSelect" :options="statuses" class="w-full uppercase">
            <template #option="slotProps">
                <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" class="uppercase" />
            </template>
        </Select>
        <template #footer>
            <Button label="Save" @click="editStatus" class="w-full" />
        </template>
    </Dialog>

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
            <Column field="name" header="Panel Name" >
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="tracking_number" header="Tracking Number" >
                <template #body="{ data }">
                    {{ data.tracking_number }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="date_completed" header="Date Completed" >
                <template #body="{ data }">
                    {{ data.date_completed }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="date_shipped" header="Date Shipped">
                <template #body="{ data }">
                    {{ data.date_shipped }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search by name" />
                </template>
            </Column>
            <Column field="status" header="Status" :showFilterMenu="false" >
                <template #body="{ data }">
                    <Tag class="uppercase" :value="data.status" :severity="getSeverity(data.status)" @click="open(data.id)" />
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Select>
                </template>
            </Column>
            <Column style="width: 15%" header="View">
                <template #body="{ data }">
                    <Button as="router-link" :to="`/panel/${data.id}`" icon="pi pi-eye" type="button" class="p-button-text"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
