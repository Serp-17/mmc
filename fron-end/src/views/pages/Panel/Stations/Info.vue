<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useClipboard } from '@/utils/useClipboard';

const props = defineProps({
    panel_status: {
        type: String,
        default: null
    },
    links: {
        type: Array,
        // eslint-disable-next-line vue/require-valid-default-prop
        default: []
    }
});
const { params } = useRoute();
const store = useStore();
const menu = ref(null);
const { copyToClipboard } = useClipboard();

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' }
]);
const dropdownStatus = ref(['in progress', 'qa', 'done']);
const status = ref(null);

const onChange = (e) => {
    const { value } = e;
    store.dispatch('panels/putPanel', { id: params.id, data: { status: value } }).then(() => {
        store.dispatch('panels/fetchPanelById', params.id);
    });
};

onMounted(() => {
    status.value = props.panel_status;
});
</script>

<template>
    <div class="grid grid-cols-2 gap-8">
        <div class="card mb-0 grid gap-6">
            <div class="font-semibold text-xl">Info</div>
            <div class="flex justify-start items-center gap-6">
                <div class="font-semibold text-lg flex items-center">Status</div>
                <Select v-model="status" :options="dropdownStatus" placeholder="Select" @change="onChange" class="uppercase" />
            </div>
            <hr />
            <div class="">
                <div class="flex items-center justify-between mb-6">
                    <div class="font-semibold text-xl">Notifications</div>

                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu.toggle($event)"></Button>
                        <Menu ref="menu" popup :model="items" class="!min-w-40"></Menu>
                    </div>
                </div>

                <span class="block text-muted-color font-medium mb-4">TODAY</span>
                <ul class="p-0 mx-0 mt-0 mb-6 list-none">
                    <li class="flex items-center py-2 border-b border-surface">
                        <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-dollar !text-xl text-blue-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal"
                            >Richard Jones
                            <span class="text-surface-700 dark:text-surface-100">has purchased a blue t-shirt for <span class="text-primary font-bold">$79.00</span></span>
                        </span>
                    </li>
                    <li class="flex items-center py-2">
                        <div class="w-12 h-12 flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-download !text-xl text-orange-500"></i>
                        </div>
                        <span class="text-surface-700 dark:text-surface-100 leading-normal">Your request for withdrawal of <span class="text-primary font-bold">$2500.00</span> has been initiated.</span>
                    </li>
                </ul>

                <span class="block text-muted-color font-medium mb-4">YESTERDAY</span>
                <ul class="p-0 m-0 list-none mb-6">
                    <li class="flex items-center py-2 border-b border-surface">
                        <div class="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-dollar !text-xl text-blue-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal"
                            >Keyser Wick
                            <span class="text-surface-700 dark:text-surface-100">has purchased a black jacket for <span class="text-primary font-bold">$59.00</span></span>
                        </span>
                    </li>
                    <li class="flex items-center py-2 border-b border-surface">
                        <div class="w-12 h-12 flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-question !text-xl text-pink-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal"
                            >Jane Davis
                            <span class="text-surface-700 dark:text-surface-100">has posted a new questions about your product.</span>
                        </span>
                    </li>
                </ul>
                <span class="block text-muted-color font-medium mb-4">LAST WEEK</span>
                <ul class="p-0 m-0 list-none">
                    <li class="flex items-center py-2 border-b border-surface">
                        <div class="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-arrow-up !text-xl text-green-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal">Your revenue has increased by <span class="text-primary font-bold">%25</span>.</span>
                    </li>
                    <li class="flex items-center py-2 border-b border-surface">
                        <div class="w-12 h-12 flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-full mr-4 shrink-0">
                            <i class="pi pi-heart !text-xl text-purple-500"></i>
                        </div>
                        <span class="text-surface-900 dark:text-surface-0 leading-normal"><span class="text-primary font-bold">12</span> users have added your products to their wishlist.</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="card">
            <div class="font-semibold text-xl mb-4">Links</div>
            <div class="grid gap-6">
                <InputGroup v-for="(item, index) in links" :key="index">
                    <div class="me-5 flex items-center font-semibold">{{ item.name }}</div>
                    <InputText :value="item.url" />
                    <InputGroupAddon class="cursor-pointer">
                        <a target="_blank" :href="item.url">
                            <i class="pi pi-external-link"></i>
                        </a>
                    </InputGroupAddon>
                    <InputGroupAddon class="cursor-pointer" @click="copyToClipboard(item.url)">
                        <i class="pi pi-copy"></i>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        </div>
    </div>
</template>
