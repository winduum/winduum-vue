<script setup lang="ts">
    import { showRipple } from 'winduum/src/utilities/ripple/index.js'

    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'button'
    })
</script>

<template>
    <component class="ui-btn" :is="as" @click="showRipple">
        <slot></slot>
    </component>
</template>
