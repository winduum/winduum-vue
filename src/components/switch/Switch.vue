<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'label'
    })
</script>

<template>
    <component class="x-switch" :is="as">
        <slot></slot>
    </component>
</template>
