<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const store = useStore();
const model = ref([
    {
        label: '',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', to: '/' },
            { label: 'Volumes', icon: 'pi pi-fw pi-warehouse', to: '/volumes' },
            { label: 'Team', icon: 'pi pi-fw pi-user', to: '/team' },
            { label: 'Warehouse', icon: 'pi pi-fw pi-table', to: '/warehouse' }
        ]
    }
]);

const logout = () => {
    const redirect = route.query.redirect || '/login';

    store.dispatch('user/logoutUser');
    router.push(redirect);
};
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
    <button class="mt-auto py-3 px-4" @click="logout">
        <i class="layout-menuitem-icon pi pi-fw pi-sign-out"></i>
        Log out
    </button>
</template>

<style lang="scss" scoped></style>
