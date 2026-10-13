<script setup lang="ts">
    import type { ValidateFieldOptions } from 'winduum/src/components/field'
    import { validateField } from 'winduum/src/components/field'

    interface Props {
        as?: string
        validateOptions?: ValidateFieldOptions
    }

    withDefaults(defineProps<Props>(), {
        as: 'div'
    })
</script>

<template>
    <component class="x-field" :is="as" @change="validateField($event.currentTarget as HTMLElement, validateOptions)">
        <slot></slot>
    </component>
</template>
