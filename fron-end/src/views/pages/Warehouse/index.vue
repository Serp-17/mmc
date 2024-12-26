<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const store = useStore();
const storage = computed(() => store.getters['storage/getStorage']);
const display = ref(false);
const selectedId = ref(null);
const quantity = ref(null);

const open = (id) => {
    selectedId.value = id;
    display.value = true;
};

const takeItem = () => {
    toast.add({ severity: 'success', summary: 'Success', detail: `You successfully took the ${storage.value.find((item) => item.id === selectedId.value).name}`, life: 3000 });
    display.value = false;
};

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
                    <router-link :to="{ name: 'item', params: { id: data.id } }">
                        {{ data.name }}
                    </router-link>
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
            <Column header="" style="min-width: 5rem">
                <template #body="{ data }">
                    <Button label="Take" class="w-full" @click="open(data.id)"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
    <Dialog v-if="selectedId" :header="`You take ${storage.find((item) => item.id === selectedId).name}`" v-model:visible="display" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
        <div class="flex flex-wrap gap-2 w-full">
            <label for="quantity">Quantity</label>
            <InputText id="quantity" type="number" v-model="quantity" />
        </div>
        <template #footer>
            <Button label="Save" @click="takeItem" />
        </template>
    </Dialog>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
