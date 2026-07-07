<script setup lang="ts">
    import type { ValidateFormOptions } from 'winduum/src/components/form'
    import { validateForm } from 'winduum/src/components/form'

    interface Props {
        validateOptions?: ValidateFormOptions
    }

    const props = defineProps<Props>()

    const validate = (event: SubmitEvent) => {
        validateForm(event, props.validateOptions)
    }
</script>

<template>
    <form class="x-form" novalidate @submit="validate">
        <slot></slot>
    </form>
</template>
