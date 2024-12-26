<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const id = route.params.id;
const store = useStore();
const transactions = computed(() => store.getters['transactions/getTransactions']);
const product = computed(() => store.getters['storage/getItem']);
const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
const breadcrumbItems = ref([{ label: 'Warehouse', url: '/warehouse' }, { label: 'Transactions' }]);

const getTransactionType = (type) => {
    switch (type) {
        case 'add':
            return 'success';
        case 'remove':
            return 'warn';
        default:
            return null;
    }
};

onMounted(() => {
    store.dispatch('transactions/fetchTransactionsById', id);
    store.dispatch('storage/fetchItemById', id);
});
</script>

<template>
    <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

    <div class="card mt-8">
        <div class="font-semibold text-xl mb-4">Filtering</div>
        <DataTable v-if="product" :value="[product]" :paginator="false" :rows="1" dataKey="id" :rowHover="true" showGridlines>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column field="id" header="Id" style="width: 60px">
                <template #body="{ data }">
                    {{ data.id }}
                </template>
            </Column>
            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    <router-link :to="{ name: 'item', params: { id: data.id } }">
                        {{ data.name }}
                    </router-link>
                </template>
            </Column>
            <Column header="Quantity" filterField="quantity" dataType="numeric" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.quantity }}
                </template>
            </Column>
            <Column header="Description" filterField="quantity" dataType="numeric" style="min-width: 10rem">
                <template #body="{ data }">
                    {{ data.description }}
                </template>
            </Column>
        </DataTable>
        <DataTable v-if="transactions" :value="transactions" dataKey="id" class="mt-8">
            <Column field="id" header="Transaction ID" style="max-width: 60px"></Column>
            <Column field="transaction_type" header="Transaction Type">
                <template #body="{ data }">
                    <Tag :value="data.transaction_type" :severity="getTransactionType(data.transaction_type)" />
                </template>
            </Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="user_id" header="User"></Column>
            <Column field="description" header="Description"></Column>
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
