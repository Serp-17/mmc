<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dropdownValues = ref([
    { name: 'Yes', value: 'yes' },
    { name: 'No', code: 'no' }
]);

const axis1And2Measurements = ref({
    one: null,
    two: null
});
const isFrameSquareToTolerance = ref(null);
const areStudsAlignedWithRails = ref(null);
const isCatchmentStudOrientationCorrect = ref(null);
const isIpSigned = ref(null);

const selectedFiles = ref([]);

const isDisabled = () => {
    return isFrameSquareToTolerance.value === null || areStudsAlignedWithRails.value === null || isCatchmentStudOrientationCorrect.value === null || isIpSigned.value === null;
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
                        1. What do axis 1 & 2 Measure?
                    </div>
                    <div class="flex gap-4">
                        <InputGroup>
                            <InputNumber v-model="axis1And2Measurements.one" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputNumber v-model="axis1And2Measurements.two" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        2. Is the frame square to a tolerence of 4mm?
                    </div>
                    <Select v-model="isFrameSquareToTolerance" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        3. Are studs in line with the top and bottom rail?
                    </div>
                    <Select v-model="areStudsAlignedWithRails" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        4. Is catchment stud in the correct orientation? (if necessary)
                    </div>
                    <Select v-model="isCatchmentStudOrientationCorrect" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        5. Is the IP signed?
                    </div>
                    <Select v-model="isIpSigned" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image of finish internal</div>
                    <FileUpload
                        mode="basic"
                        name="demo[]"
                        :multiple="true"
                        accept="image/*"
                        :maxFileSize="1000000"
                        @select="(e) => handleSelect(e, 'selectedFiles')"
                        severity="secondary"
                        class="p-button-outlined"
                    />
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
