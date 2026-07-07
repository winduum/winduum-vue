<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'div'
    })
</script>

<template>
    <component class="x-drawer-content" :is="as" data-x-drawer-part="content">
        <slot></slot>
    </component>
</template>
