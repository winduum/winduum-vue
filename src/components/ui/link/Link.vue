<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'a'
    })
</script>

<template>
    <component class="ui-link" :is="as">
        <slot></slot>
    </component>
</template>
