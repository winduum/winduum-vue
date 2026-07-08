<script setup lang="ts">
    import type { ToggleDetailsOptions } from 'winduum/src/components/details'

    interface Props {
        toggleOptions?: ToggleDetailsOptions
    }

    const props = defineProps<Props>()

    const toggleDetails = async ({ target }: Event) => {
        if (!(target as HTMLInputElement).closest('summary')) return

        const { toggleDetails } = await import('winduum/src/components/details')

        toggleDetails(target as HTMLInputElement, props.toggleOptions)
    }
</script>

<template>
    <details class="x-details" @change="toggleDetails">
        <slot></slot>
    </details>
</template>
