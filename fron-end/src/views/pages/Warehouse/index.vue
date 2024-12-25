<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const storage = computed(() => store.getters['storage/getStorage']);

onMounted(() => {
    store.dispatch('storage/fetchStorage');
});
</script>

<template>
    <div class="card">
        <div class="flex items-center justify-between mb-10">
            <div class="font-semibold text-xl">Warehouse</div>
            <Button as="router-link" label="Add new" to="/warehouse/add"></Button>
        </div>
        <DataTable :value="storage" :paginator="true" :rows="10" dataKey="id" :rowHover="true" filterDisplay="menu" :loading="false" :globalFilterFields="['name', 'representative.name', 'balance', 'status']" showGridlines>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column field="id" header="Id" style="width: 60px">
                <template #body="{ data }">
                    {{ data.id }}
                </template>
            </Column>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                </template>
            </Column>
            <Column header="Quantity" filterField="quantity" dataType="numeric" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.quantity }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                </template>
            </Column>
            <Column header="Description" filterField="quantity" dataType="numeric" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.description }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
