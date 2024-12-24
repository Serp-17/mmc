<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const isAuth = computed(() => store.getters['user/getToken']);
const dd = () => {
    console.log(store.getters['user/getToken']);
}
</script>

<template>
    {{ !!isAuth }}
    <div @click="dd">asdasdasd</div>
    <div @click="store.dispatch('user/logoutUser')">
        Login
    </div>
    <router-view />
</template>

<style scoped></style>
