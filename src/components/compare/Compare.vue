<script setup lang="ts">
    import type { SetPositionOptions } from 'winduum/src/components/compare'
    import { setPosition, setKeyboardStep, setMouseStep } from 'winduum/src/components/compare'

    interface Props {
        as?: string
        keyboardStep?: string
        mouseStep?: string
        positionOptions?: SetPositionOptions
    }

    withDefaults(defineProps<Props>(), {
        as: 'div'
    })
</script>

<template>
    <component
        class="x-compare"
        :is="as"
        @input="setPosition($event.target as HTMLInputElement, positionOptions)"
        @keydown="setKeyboardStep($event.target as HTMLInputElement, ($event as KeyboardEvent).key, keyboardStep)"
        @mousedown="setMouseStep($event.target as HTMLInputElement, mouseStep)"
    >
        <slot></slot>
    </component>
</template>
