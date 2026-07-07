<script setup lang="ts">
    import type { ValidateFieldOptions } from 'winduum/src/components/form'
    import { validateField } from 'winduum/src/components/form'

    interface Props {
        as?: string
        validateOptions?: ValidateFieldOptions
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'div'
    })

    const validate = ({ currentTarget }: Event) => {
        validateField(currentTarget as HTMLElement, props.validateOptions)
    }
</script>

<template>
    <component class="x-field" :is="as" @change="validate">
        <slot></slot>
    </component>
</template>
