<script setup>
import { onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dropdownValues = ref([
    { name: 'Yes', value: 'yes' },
    { name: 'No', code: 'no' }
]);

const hasCorrectNumberOfJoistsProcessed = ref(null);
const areAnyHolesMissing = ref(null);
const areAllHolesInCorrectLocation = ref(null);
const areAllHolesNeatlyCut = ref(null);
const areAllJoistsLabelled = ref(null);
const selectedFiles = ref([]);

const isDisabled = () => {
    return hasCorrectNumberOfJoistsProcessed.value === null ||
        areAnyHolesMissing.value === null ||
        areAllHolesInCorrectLocation.value === null ||
        areAllHolesNeatlyCut.value === null ||
        areAllJoistsLabelled.value === null;
};

const handleSubmit = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'Uploaded', life: 3000 });
};

const handleSelect = (event, name) => {
    const targetRefs = {
        selectedFiles
    };

    const targetRef = targetRefs[name];

    if (targetRef) {
        targetRef.value = []; // Сбрасываем предыдущие значения

        Array.from(event.files).forEach((file) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                targetRef.value.push({
                    file,
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    preview: e.target.result
                });
            };

            reader.readAsDataURL(file);
        });
    }
};
</script>

<template>
    <Fluid class="flex flex-col justify-center md:flex-row gap-8 mt-8">
        <div class="md:w-1/2">
            <div class="card flex flex-col gap-8">
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        1. Have you processed the correct number of Joists?
                    </div>
                    <Select v-model="hasCorrectNumberOfJoistsProcessed" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        2. Are any holes missing?
                    </div>
                    <Select v-model="areAnyHolesMissing" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        3. Are all holes in the correct location?
                    </div>
                    <Select v-model="areAllHolesInCorrectLocation" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        4. Are all holes neatly cut?
                    </div>
                    <Select v-model="areAllHolesNeatlyCut" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        5. Are all joists labelled?
                    </div>
                    <Select v-model="areAllJoistsLabelled" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>

                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'selectedFiles')" severity="secondary" class="p-button-outlined" />
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
