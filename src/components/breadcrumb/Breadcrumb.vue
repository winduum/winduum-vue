<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'nav'
    })
</script>

<template>
    <component class="x-breadcrumb" :is="as" aria-label="breadcrumb">
        <slot></slot>
    </component>
</template>
