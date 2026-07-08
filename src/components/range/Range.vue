<script setup lang="ts">
    import type { ComponentPublicInstance } from 'vue'
    import { computed, watch } from 'vue'

    type ElementRef = ComponentPublicInstance | HTMLInputElement | null

    interface Props {
        as?: string
        refs?: {
            startElement?: ElementRef
            endElement?: ElementRef
        }
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'div'
    })

    const startElement = computed(() => (props.refs?.startElement as ComponentPublicInstance)?.$el ?? props.refs?.startElement)
    const endElement = computed(() => (props.refs?.endElement as ComponentPublicInstance)?.$el ?? props.refs?.endElement)

    const setValue = async ({ currentTarget }: { currentTarget: EventTarget | null }) => {
        const target = currentTarget

        if (!(target instanceof HTMLInputElement) || target.type !== 'range') return

        const track = target === endElement.value ? 'end' : 'start'
        const { setValue, setOutputValue } = await import('winduum/src/components/range')

        setValue(target, { track })

        const outputElement = document.getElementById(target.getAttribute('aria-labelledby') ?? '')

        if (outputElement) setOutputValue(target, outputElement)
    }

    watch(startElement, (element) => {
        if (element) void setValue({ currentTarget: element })
    })

    watch(endElement, (element) => {
        if (element) void setValue({ currentTarget: element })
    })
</script>

<template>
    <component class="x-range" :is="as">
        <slot :setValue="setValue"></slot>
    </component>
</template>
