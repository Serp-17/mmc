<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dropdownValues = ref([
    { name: 'Yes', value: 'yes' },
    { name: 'No', code: 'no' }
]);
const isFrameWithinSpec = ref(null);
const areOverhangsUnderhangsCorrect = ref(null);

const selectedFiles = ref([]);
const insertImageWithInsulatedVoids = ref([]);
const insertImageFirstBoardedSide = ref([]);
const insertImageOfFinishedParapet = ref([]);

const isDisabled = () => {
    return isFrameWithinSpec.value === null || areOverhangsUnderhangsCorrect.value === null;
};

const handleSubmit = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'Uploaded', life: 3000 });
};

const handleSelect = (event, name) => {
    const targetRefs = {
        insertImageWithInsulatedVoids,
        insertImageFirstBoardedSide,
        insertImageOfFinishedParapet,
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
                        1.Is the frame within specification?
                    </div>
                    <Select v-model="isFrameWithinSpec" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        2. Are all overhangs & underhangs correct?
                    </div>
                    <div class="font-semibold text-xl"></div>
                    <Select v-model="areOverhangsUnderhangsCorrect" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image with insulatted voids</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'insertImageWithInsulatedVoids')" severity="secondary" class="p-button-outlined" />
                    <div v-if="insertImageWithInsulatedVoids.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageWithInsulatedVoids" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image first boarded side </div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'insertImageFirstBoardedSide')" severity="secondary" class="p-button-outlined" />
                    <div v-if="insertImageFirstBoardedSide.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageFirstBoardedSide" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image of finiahed parapet </div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'insertImageOfFinishedParapet')" severity="secondary" class="p-button-outlined" />
                    <div v-if="insertImageOfFinishedParapet.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageOfFinishedParapet" :key="index" class="file-item">
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
