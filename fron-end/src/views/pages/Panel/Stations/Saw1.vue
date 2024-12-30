<script setup>
import { defineProps, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';

const props = defineProps({
    id_panel: {
        type: String || Number,
        default: 0
    }
});

const store = useStore();
const toast = useToast();
const dropdownValues = ref([
    { name: 'Yes', value: 'yes' },
    { name: 'No', code: 'no' }
]);
const isMaterialDefectFree = ref(null);
const arePiecesLabelledCorrectly = ref(null);
const areItemsInTolerance = ref(null);
const selectedFiles = ref([]);
// onMounted(() => {
//
// });

const isDisabled = () => {
    return isMaterialDefectFree.value === null || arePiecesLabelledCorrectly.value === null || areItemsInTolerance.value === null;
};

const handleSubmit = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'Uploaded', life: 3000 });
    store.dispatch('stations/postStation', {
        id_panel: props.id_panel,
        station: 'Saw1',
        data: {
            test: 'test'
        }
    });
};

const handleSelect = (event) => {
    selectedFiles.value = [];

    Array.from(event.files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            selectedFiles.value.push({
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                preview: e.target.result
            });
        };
        reader.readAsDataURL(file);
    });
};
</script>

<template>
    <Fluid class="flex flex-col justify-center md:flex-row gap-8 mt-8">
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-8">
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        1. Is the material free from defect? <span class="text-base text-gray-500">(20% Moisture content ; straight)</span>
                    </div>
                    <Select v-model="isMaterialDefectFree" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        2. Are all pieces of the cutting list labelled correctly?
                    </div>
                    <div class="font-semibold text-xl"></div>
                    <Select v-model="arePiecesLabelledCorrectly" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        3. Are all items in tolerance <span class="text-base text-gray-500">(-2+4mm) thickness and width ; (+-1)mm cut length</span>
                    </div>
                    <Select v-model="areItemsInTolerance" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="handleSelect" severity="secondary" class="p-button-outlined" />
                    <div v-if="selectedFiles.length" class="file-preview mt-4">
                        <div v-for="(file, index) in selectedFiles" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <Button label="Submit" :disabled="isDisabled()" @click="handleSubmit"></Button>
            </div>
        </div>
    </Fluid>
</template>
