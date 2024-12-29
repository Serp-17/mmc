<script setup>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { ref } from "vue";

const toast = useToast();
const store = useStore();
const props = defineProps({
    panels: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: []
    }
});
const { params } = useRoute();
const selectedId = ref(null);
const modelSelect = ref(null);
const display = ref(false);
const statuses = ['done', 'qa', 'in progress'];

const open = (id) => {
    const status = props.panels.find((item) => item.id === id).status;
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
        store.dispatch('panels/fetchInProgressPanels', params.id);
        store.dispatch('panels/fetchPanelsStatistic', params.id);
        selectedId.value = null;
        modelSelect.value = null;
        display.value = false;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Status update', life: 3000 });
    });
};
</script>

<template>
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

    <div class="card">
        <div class="font-semibold text-xl mb-4 flex justify-between items-center">
            <p>Panels in progress</p>
            <Button as="router-link" label="All panels" class="p-button-link" :to="`/panels/${params.id}`" />
        </div>
        <DataTable :value="props.panels" :rows="5" :paginator="true" responsiveLayout="scroll">
            <Column field="name" header="Name" :sortable="true" style="width: 35%"></Column>
            <Column field="tracking_number" header="RO number" :sortable="true" style="width: 35%"></Column>
            <Column field="status" header="Status" style="width: 35%">
                <template #body="{ data }">
                    <Tag @click="open(data.id)" class="uppercase cursor-pointer" :value="data.status" severity="warn" />
                </template>
            </Column>
            <Column style="width: 15%" header="View">
                <template #body>
                    <Button as="router-link" :to="`/panel/${1}`" icon="pi pi-eye" type="button" class="p-button-text"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
