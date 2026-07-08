<script setup lang="ts">
    import type { ValidateFormOptions } from 'winduum/src/components/form'
    import { validateForm } from 'winduum/src/components/form'

    interface Props {
        validateOptions?: ValidateFormOptions
    }

    defineProps<Props>()
</script>

<template>
    <form class="x-form" novalidate @submit="validateForm($event as SubmitEvent, validateOptions)">
        <slot></slot>
    </form>
</template>
