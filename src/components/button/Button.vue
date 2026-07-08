<script setup lang="ts">
    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'button'
    })

    const showRipple = async ({ currentTarget, offsetX, offsetY }: MouseEvent) => {
        const { showRipple } = await import('winduum/src/utilities/ripple/index.js')

        showRipple({ currentTarget: currentTarget ?? undefined, offsetX, offsetY })
    }
</script>

<template>
    <component class="x-button" :is="as" @click="showRipple">
        <slot></slot>
    </component>
</template>
