<script setup>
import {onMounted, ref} from 'vue';
import {useToast} from 'primevue/usetoast';

const toast = useToast();
const dropdownValues = ref([
    {name: 'Yes', value: 'yes'},
    {name: 'No', code: 'no'}
]);

const twoAxisMeasurements = ref({
    one: null,
    two: null
});
const isCassetteSquare = ref(null);
const areJoistHangersInCorrectLocation = ref(null);
const isGlueAboveAllBoardJoints = ref(null);
const insertImageBeforeDecking = ref([]);
const insertImageWithDecking = ref([]);
const insertImageWithA1Board = ref([]);

const isDisabled = () => {
    return isCassetteSquare.value === null ||
        areJoistHangersInCorrectLocation.value === null ||
        isGlueAboveAllBoardJoints.value === null;
};

const handleSubmit = () => {
    toast.add({severity: 'info', summary: 'Success', detail: 'Uploaded', life: 3000});
};

const handleSelect = (event, name) => {
    const targetRefs = {
        insertImageBeforeDecking,
        insertImageWithDecking,
        insertImageWithA1Board
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
                        1. What do the two axis measure?
                    </div>
                    <div class="flex gap-4">
                        <InputGroup>
                            <InputNumber v-model="twoAxisMeasurements.one" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                        <InputGroup>
                            <InputNumber v-model="twoAxisMeasurements.two" />
                            <InputGroupAddon>mm</InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        2. Is the cassette square?
                    </div>
                    <Select v-model="isCassetteSquare" :options="dropdownValues" optionLabel="name"
                            placeholder="Select"/>
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        3. Are all Joist hangers in the correct location?
                    </div>
                    <Select v-model="areJoistHangersInCorrectLocation" :options="dropdownValues" optionLabel="name"
                            placeholder="Select"/>
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        4. Is there glue above all board joints?
                    </div>
                    <Select v-model="isGlueAboveAllBoardJoints" :options="dropdownValues" optionLabel="name"
                            placeholder="Select"/>
                </div>

                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image before decking</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000"
                                @select="(e) => handleSelect(e, 'insertImageBeforeDecking')" severity="secondary" class="p-button-outlined"/>
                    <div v-if="insertImageBeforeDecking.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageBeforeDecking" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image with decking</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000"
                                @select="(e) => handleSelect(e, 'insertImageWithDecking')" severity="secondary" class="p-button-outlined"/>
                    <div v-if="insertImageWithDecking.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageWithDecking" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">Insert image with A1 Board</div>
                    <FileUpload mode="basic" name="demo[]" :multiple="true" accept="image/*" :maxFileSize="1000000"
                                @select="(e) => handleSelect(e, 'insertImageWithA1Board')" severity="secondary" class="p-button-outlined"/>
                    <div v-if="insertImageWithA1Board.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageWithA1Board" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image"/>
                            </div>
                        </div>
                    </div>
                </div>
                <Button label="Submit" :disabled="isDisabled()" @click="handleSubmit"></Button>
            </div>
        </div>
    </Fluid>
</template>
