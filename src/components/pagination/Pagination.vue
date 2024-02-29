<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'nav'
    })
</script>

<template>
    <component class="c-pagination" :is="as" aria-label="pagination">
        <slot></slot>
    </component>
</template>
