<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'div'
    })
</script>

<template>
    <component class="x-tabs-list" :is="as" role="tablist">
        <slot></slot>
    </component>
</template>
