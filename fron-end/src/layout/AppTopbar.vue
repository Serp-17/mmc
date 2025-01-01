<script setup>
import { useStore } from 'vuex';
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { onMounted, computed } from "vue";

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
const store = useStore();
const user = computed(() => store.getters['user/getUser']);

onMounted(() => {
    store.dispatch('user/fetchUser');
});
</script>

<template>
    <div class="layout-topbar" @click="console.log(user)">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <svg id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 87 30" class="min-w-16" :class="isDarkTheme && 'fill-white'">
                    <path d="m36.13,0h-6.7c-.4,0-.73.33-.73.73v28.53c0,.4.33.73.73.73h6.7c.4,0,.73-.33.73-.73V.73c0-.41-.33-.73-.73-.73">

                    </path>
                    <path d="m56.82,0h-15.5c-.4,0-.73.33-.73.73v5.75c0,.41.33.73.73.73h2.97c.4,0,.73.33.73.73v10.93c0,2.15.67,4.25,1.93,5.98.62.85,1.38,1.72,2.27,2.41,2.89,2.24,5.97,2.64,7.57,2.69.41.01.76-.32.76-.73v-5.32c0-.38-.29-.7-.67-.73-.64-.05-1.52-.2-2.36-.88-.16-.13-.32-.3-.47-.48-.73-.89-1.1-2.03-1.09-3.18.02-2.3.05-7.51.07-10.69,0-.4.33-.73.73-.73h3.06c.4,0,.73-.33.73-.74V.73c0-.4-.33-.73-.73-.73"></path>
                    <path d="m12.63,7.06c2.23,0,4.11,1.65,4.45,3.8.06.35.37.61.72.61h6.82c.42,0,.76-.36.73-.78C24.95,3.98,19.61-.18,12.59,0,5.73.19,0,4.13,0,11.44v7.11c0,7.31,5.73,11.26,12.59,11.44,7.02.18,12.36-3.97,12.77-10.69.02-.42-.31-.78-.73-.78h-6.82c-.36,0-.67.26-.72.61-.34,2.15-2.22,3.81-4.45,3.8-2.43,0-4.48-1.97-4.48-4.41v-7.05c0-2.44,2.05-4.41,4.48-4.41"></path><path d="m85.51,0h-6.36c-.4,0-.73.33-.73.73,0,5.94.11,12.15.02,17.82,0,.3-.03.43-.03.43-.39,2.21-2.29,3.92-4.58,3.92-2.48,0-4.58-2-4.61-4.49-.01-5.07,0-14.91,0-17.67,0-.4-.33-.73-.73-.73h-6.35c-.4,0-.73.33-.73.73v18.91c0,1.85.52,3.67,1.54,5.21,1.06,1.62,2.76,3.43,5.33,4.33,3.46,1.21,7.15.68,10.05-1.59.36-.28.89-.16,1.1.24l.9,1.77c.13.24.38.39.65.39h4.54c.4,0,.73-.33.73-.73V.73c0-.41-.33-.73-.73-.73"></path>
                </svg>
                <span>MMC</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button"
                        class="layout-topbar-action layout-topbar-action-highlight"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
