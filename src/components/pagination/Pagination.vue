<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'nav'
    })
</script>

<template>
    <component class="x-pagination" :is="as" aria-label="pagination">
        <slot></slot>
    </component>
</template>
