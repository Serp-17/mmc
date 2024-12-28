<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dropdownValues = ref([
    { name: 'Yes', value: 'yes' },
    { name: 'No', code: 'no' }
]);

const panelLengthAndHeight = ref({
    length: null,
    height: null
});
const frameCornerToCornerMeasurement = ref({
    one: null,
    two: null
});
const isFrameWithinSpecification = ref(null);
const areNailsProtrudingOrMissing = ref(null);
const structuralOpeningLengthAndWidth = ref({
    length: null,
    height: null
});
const structuralOpeningLengthAndWidthSecond = ref({
    length: null,
    height: null
});
const insertImageToThisBox = ref([]);
const insertImageToThisBoxShowingA1 = ref([]);
const isDisabled = () => {
    return false;
};

const handleSubmit = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'Uploaded', life: 3000 });
};

const handleSelect = (event, name) => {
    const targetRefs = {
        insertImageToThisBox,
        insertImageToThisBoxShowingA1
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
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">1. Panel length and height</div>
                    <div class="flex gap-4">
                        <InputGroup>
                            <InputGroupAddon> Length </InputGroupAddon>
                            <InputNumber v-model="panelLengthAndHeight.length" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon> Height </InputGroupAddon>
                            <InputNumber v-model="panelLengthAndHeight.height" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">2. What does the frame measure from corner to corner?</div>
                    <div class="font-semibold text-xl"></div>
                    <div class="flex gap-4">
                        <InputGroup>
                            <InputNumber v-model="frameCornerToCornerMeasurement.one" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputNumber v-model="frameCornerToCornerMeasurement.two" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">3. Is the frame within specification?</div>
                    <Select v-model="isFrameWithinSpecification" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">4. Are any nails protruding or missing?</div>
                    <Select v-model="areNailsProtrudingOrMissing" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">5. The structural opening length and width</div>
                    <div class="flex gap-4">
                        <InputGroup>
                            <InputGroupAddon> Length </InputGroupAddon>
                            <InputNumber v-model="structuralOpeningLengthAndWidth.length" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon> Height </InputGroupAddon>
                            <InputNumber v-model="structuralOpeningLengthAndWidth.height" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                    </div>
                    <hr class="my-2">
                    <div class="flex gap-4">
                        <InputGroup>
                            <InputGroupAddon> Length </InputGroupAddon>
                            <InputNumber v-model="structuralOpeningLengthAndWidthSecond.length" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputGroupAddon> Height </InputGroupAddon>
                            <InputNumber v-model="structuralOpeningLengthAndWidthSecond.height" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'insertImageToThisBox')" severity="secondary"  class="p-button-outlined"/>
                    <div v-if="insertImageToThisBox.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageToThisBox" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image of A1 board fitted to this box</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="(e) => handleSelect(e, 'insertImageToThisBoxShowingA1')" severity="secondary" class="p-button-outlined" />
                    <div v-if="insertImageToThisBoxShowingA1.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageToThisBoxShowingA1" :key="index" class="file-item">
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
