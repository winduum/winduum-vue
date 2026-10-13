<script setup lang="ts">
    import type { SetPositionOptions } from 'winduum/src/components/compare'

    interface Props {
        as?: string
        keyboardStep?: string
        mouseStep?: string
        positionOptions?: SetPositionOptions
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'div'
    })

    const setPosition = async ({ target }: Event) => {
        const { setPosition } = await import('winduum/src/components/compare')

        setPosition(target as HTMLInputElement, props.positionOptions)
    }

    const setKeyboardStep = async ({ key, target }: KeyboardEvent) => {
        const { setKeyboardStep } = await import('winduum/src/components/compare')

        setKeyboardStep(target as HTMLInputElement, key, props.keyboardStep)
    }

    const setMouseStep = async ({ target }: MouseEvent) => {
        const { setMouseStep } = await import('winduum/src/components/compare')

        setMouseStep(target as HTMLInputElement, props.mouseStep)
    }
</script>

<template>
    <component
        class="x-compare"
        :is="as"
        @input="setPosition"
        @keydown="setKeyboardStep"
        @mousedown="setMouseStep"
    >
        <slot></slot>
    </component>
</template>
