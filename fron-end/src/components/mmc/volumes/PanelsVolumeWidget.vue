<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
    panels: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: []
    }
});
const { params } = useRoute();
</script>

<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4 flex justify-between items-center">
            <p>Panels in progress</p>
            <Button as="router-link" label="All panels" class="p-button-link" :to="`/panels/${ params.id }`" />
        </div>
        <DataTable :value="props.panels" :rows="5" :paginator="true" responsiveLayout="scroll">
            <Column field="name" header="Name" :sortable="true" style="width: 35%"></Column>
            <Column field="tracking_number" header="RO number" :sortable="true" style="width: 35%"></Column>
            <Column field="status" header="Status" style="width: 35%">
                <template #body="{ data }">
                    <Tag class="uppercase" :value="data.status" severity="warn" />
                </template>
            </Column>
            <Column style="width: 15%" header="View">
                <template #body>
                    <Button as="router-link" icon="pi pi-search" type="button" class="p-button-text"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
