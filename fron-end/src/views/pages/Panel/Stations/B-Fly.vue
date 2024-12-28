<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const dropdownValues = ref([
    { name: 'Yes', value: 'yes' },
    { name: 'No', code: 'no' }
]);
const areOverhangsAndUnderhangsCorrect = ref(null);
const isFrameWithinSpecification = ref(null);
const insertImageToThisBoxShowingInsulatedVoids = ref([]);
const insertImageToThisBoxShowingWindowOpeningTapingOfPanel = ref([]);
const insertImageToThisBoxShowingA1BoardFitted = ref([]);

const isDisabled = () => {
    return areOverhangsAndUnderhangsCorrect.value === null || isFrameWithinSpecification.value === null;
};

const handleSubmit = () => {
    toast.add({ severity: 'info', summary: 'Success', detail: 'Uploaded', life: 3000 });
};

const handleSelect = (event, name) => {
    const targetRefs = {
        insertImageToThisBoxShowingInsulatedVoids,
        insertImageToThisBoxShowingWindowOpeningTapingOfPanel,
        insertImageToThisBoxShowingA1BoardFitted
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
                        1. Are all overhangs & underhangs correct?
                    </div>
                    <Select v-model="areOverhangsAndUnderhangsCorrect" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div>
                    <div class="font-semibold text-xl flex items-center gap-4 mb-4">
                        2. Is the frame within specification?
                    </div>
                    <div class="font-semibold text-xl"></div>
                    <Select v-model="isFrameWithinSpecification" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">3. Insert image to this box showing insulated voids</div>
                    <FileUpload
                        mode="basic"
                        name="demo[]"
                        :multiple="true"
                        accept="image/*"
                        :maxFileSize="1000000"
                        @select="(e) => handleSelect(e, 'insertImageToThisBoxShowingInsulatedVoids')"
                        severity="secondary"
                        class="p-button-outlined"
                    />
                    <div v-if="insertImageToThisBoxShowingInsulatedVoids.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageToThisBoxShowingInsulatedVoids" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">4. Insert image to this box showing window opening/ taping of the panel</div>
                    <FileUpload
                        mode="basic"
                        name="demo[]"
                        :multiple="true"
                        accept="image/*"
                        :maxFileSize="1000000"
                        @select="(e) => handleSelect(e, 'insertImageToThisBoxShowingWindowOpeningTapingOfPanel')"
                        severity="secondary"
                        class="p-button-outlined"
                    />
                    <div v-if="insertImageToThisBoxShowingWindowOpeningTapingOfPanel.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageToThisBoxShowingWindowOpeningTapingOfPanel" :key="index" class="file-item">
                            <div v-if="file.preview">
                                <img :src="file.preview" alt="Preview" class="file-image" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-full lg:col-span-6">
                    <div class="font-semibold text-xl mb-4">5. Insert image to this box showing A1 board fitted</div>
                    <FileUpload
                        mode="basic"
                        name="demo[]"
                        :multiple="true"
                        accept="image/*"
                        :maxFileSize="1000000"
                        @select="(e) => handleSelect(e, 'insertImageToThisBoxShowingA1BoardFitted')"
                        severity="secondary"
                        class="p-button-outlined"
                    />
                    <div v-if="insertImageToThisBoxShowingA1BoardFitted.length" class="file-preview mt-4">
                        <div v-for="(file, index) in insertImageToThisBoxShowingA1BoardFitted" :key="index" class="file-item">
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
