<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import type { SetValueOptions } from 'winduum/src/components/range'
    import { setValue, setOutputValue } from 'winduum/src/components/range'

    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'div'
    })

    const element = ref<HTMLElement>()

    const getTrack = (input: HTMLInputElement): SetValueOptions['track'] => {
        const track = input.dataset.track ?? input.dataset.xRangePart ?? input.dataset.xRangeTarget

        return track === 'end' ? 'end' : 'start'
    }

    const setRangeValue = (target: EventTarget | null) => {
        if (!(target instanceof HTMLInputElement) || target.type !== 'range') return

        setValue(target, {
            track: getTrack(target)
        })

        const outputElement = document.getElementById(target.getAttribute('aria-labelledby') ?? '')

        if (outputElement) setOutputValue(target, outputElement)
    }

    onMounted(() => {
        element.value?.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach((input) => {
            setRangeValue(input)
        })
    })
</script>

<template>
    <component class="x-range" :is="as" ref="element" @input="setRangeValue($event.target)">
        <slot></slot>
    </component>
</template>
