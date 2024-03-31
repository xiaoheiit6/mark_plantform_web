<template>

    <a-layout>
        <a-layout-header :style="headerStyle">

        </a-layout-header>
        <a-layout-content :style="contentStyle">
                44

        </a-layout-content>
        <a-layout-footer :style="footerStyle">
            ChatGPT can make mistakes. Consider checking important information.
        </a-layout-footer>
    </a-layout>

</template>

<script setup>
const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#7dbcea',
};
const contentStyle = {
    textAlign: 'center',
    minHeight: 12,
    lineHeight: '500px',
    color: '#fff',
    backgroundColor: '#',
};
const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#7dbcea',
};

</script>

<style scoped></style>