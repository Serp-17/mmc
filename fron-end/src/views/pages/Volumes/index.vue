<script setup>
import { PhotoService } from '@/service/PhotoService';
import { ProductService } from '@/service/ProductService';
import Img from '@/assets/LWP15068-Enhanced-NR-Edit.webp';
import { onMounted, ref } from 'vue';

const products = ref([]);
const images = ref([]);
onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    PhotoService.getImages().then((data) => (images.value = data));
});

function getSeverity(status) {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}
</script>

<template>
    <div class="card">
        <div class="flex items-center justify-between mb-10">
            <div class="font-semibold text-xl">Volumes</div>
            <Button as="router-link" label="Add new" to="/volumes/add"></Button>
        </div>
        <div class="grid grid-cols-3">
            <router-link v-for="(item, index) in products" :key="index" :to="`/volumes/${1}`">
                <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                    <div class="mb-4">
                        <div class="relative mx-auto h-80 flex">
                            <img :src="Img" :alt="item.name" class="w-full rounded object-fill" />
                            <div class="dark:bg-surface-900 absolute rounded-border" style="left: 5px; top: 5px">
                                <Tag :value="item.inventoryStatus" :severity="getSeverity(item.inventoryStatus)" />
                            </div>
                        </div>
                    </div>
                    <div class="mb-4 font-medium">{{ item.name }}</div>
                    <div class="flex justify-between items-center">
                        <div class="mt-0 font-semibold text-xl">${{ item.price }}</div>
                        <span>
                            <Button icon="pi pi-heart" severity="secondary" outlined />
                            <Button icon="pi pi-shopping-cart" class="ml-2" />
                        </span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
