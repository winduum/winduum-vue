<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'a'
    })
</script>

<template>
    <component class="x-link" :is="as">
        <slot></slot>
    </component>
</template>
