<script setup lang="ts">
    import type { ToggleDetailsOptions } from 'winduum/src/components/details'
    import { toggleDetails } from 'winduum/src/components/details'

    interface Props {
        toggleOptions?: ToggleDetailsOptions
    }

    const props = defineProps<Props>()

    const toggleCheckbox = ({ target }: Event) => {
        if (!(target as HTMLInputElement).closest('summary')) return

        toggleDetails(target as HTMLInputElement, props.toggleOptions)
    }
</script>

<template>
    <details class="x-details" @change="toggleCheckbox">
        <slot></slot>
    </details>
</template>
