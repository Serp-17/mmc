<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const areOverhangsAndUnderhangsCorrect = ref(null);
const isFrameWithinSpecification = ref(null);
const insertImageOfPreparedWindows = ref([]);
const insertImageOfExternalWindowSide = ref([]);
const insertImageOfInternalWindowSide = ref([]);

const isDisabled = () => {
    return areOverhangsAndUnderhangsCorrect.value === null || isFrameWithinSpecification.value === null;
};

const handleSubmit = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'Uploaded', life: 3000 });
};

const handleSelect = (event, name) => {
    const targetRefs = {
        insertImageOfPreparedWindows,
        insertImageOfExternalWindowSide,
        insertImageOfInternalWindowSide
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
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image of Prepared window('s)</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'insertImageOfPreparedWindows')" severity="secondary" class="p-button-outlined" />
                    <div v-if="insertImageOfPreparedWindows.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageOfPreparedWindows" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image of external window side</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'insertImageOfExternalWindowSide')" severity="secondary" class="p-button-outlined" />
                    <div v-if="insertImageOfExternalWindowSide.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageOfExternalWindowSide" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image of internal window side</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'insertImageOfInternalWindowSide')" severity="secondary" class="p-button-outlined" />
                    <div v-if="insertImageOfInternalWindowSide.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageOfInternalWindowSide" :key="index" class="file-item">
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
