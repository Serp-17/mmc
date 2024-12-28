<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const name = ref(null);
const link = ref(null);
const breadcrumbHome = ref({ icon: 'pi pi-home', to: '/' });
const breadcrumbItems = ref([{ label: 'Volumes', url: '/volumes' }, { label: 'Add volume' }]);

const isDisabled = () => {
    return !name.value || !link.value;
};

const handleSubmit = () => {
    store.dispatch('volumes/addNewVolume', {
        name: name.value,
        link: link.value
    });
};
</script>

<template>
    <Breadcrumb :home="breadcrumbHome" :model="breadcrumbItems" />

    <Fluid class="flex flex-col justify-center md:flex-row gap-8 mt-8">
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-6">
                <FloatLabel>
                    <InputText id="username" type="text" v-model="name" />
                    <label for="username">Volume name</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="username" type="text" v-model="link" />
                    <label for="username">Folder link</label>
                </FloatLabel>
                <Button label="Submit" :disabled="isDisabled()" @click="handleSubmit"></Button>
            </div>
        </div>
    </Fluid>
</template>
