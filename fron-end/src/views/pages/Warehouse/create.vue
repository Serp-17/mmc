<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const store = useStore();
const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
const breadcrumbItems = ref([{ label: 'Warehouse', link: '/warehouse' }, { label: 'Add item' }]);

const form = ref({
    name: '',
    quantity: '',
    description: ''
});
const isLoader = ref(false);

const addItem = () => {
    isLoader.value = true;
    store.dispatch('storage/addItem', form.value).finally(() => {
        toast.add({ severity: 'success', summary: 'Successfully added', life: 3000 });
        isLoader.value = false;
        form.value.name = '';
        form.value.quantity = '';
        form.value.description = '';
    });
};
</script>

<template>
    <Fluid>
        <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />
        <div class="flex mt-8">
            <div class="card flex flex-col gap-4 w-full">
                <div class="font-semibold text-xl">Add item</div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="name">Name</label>
                        <InputText id="name" type="text" v-model="form.name" />
                    </div>
                    <div class="flex flex-wrap gap-2 w-full">
                        <label for="quantity">Quantity</label>
                        <InputText id="quantity" type="number" v-model="form.quantity" />
                    </div>
                </div>

                <div class="flex gap-2 flex-wrap">
                    <label for="description">Description</label>
                    <Textarea id="description" rows="3" v-model="form.description" />
                </div>
                <div class="flex justify-end">
                    <div class="w-80">
                        <Button label="Add item" @click="addItem" :loading="isLoader"></Button>
                    </div>
                </div>
            </div>
        </div>
    </Fluid>
</template>
