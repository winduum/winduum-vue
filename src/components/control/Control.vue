<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'div'
    })
</script>

<template>
    <component class="x-control" :is="as">
        <slot></slot>
    </component>
</template>
