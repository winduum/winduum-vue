<script setup lang="ts">
    import type { ComponentPublicInstance } from 'vue'
    import { computed, onWatcherCleanup, watch } from 'vue'

    type ElementRef = ComponentPublicInstance | HTMLElement | null

    interface Props {
        as?: string
        vertical?: boolean
        refs?: {
            contentElement?: ElementRef
            markerGroupElement?: ElementRef
            prevElement?: ElementRef
            nextElement?: ElementRef
        }
    }

    const props = withDefaults(defineProps<Props>(), { as: 'div' })

    const contentElement = computed(() => (props.refs?.contentElement as ComponentPublicInstance)?.$el ?? props.refs?.contentElement)
    const markerGroupElement = computed(() => (props.refs?.markerGroupElement as ComponentPublicInstance)?.$el ?? props.refs?.markerGroupElement)
    const prevElement = computed(() => (props.refs?.prevElement as ComponentPublicInstance)?.$el ?? props.refs?.prevElement)
    const nextElement = computed(() => (props.refs?.nextElement as ComponentPublicInstance)?.$el ?? props.refs?.nextElement)

    const scroll = async (direction: number) => {
        const { scrollBy } = await import('winduum/src/components/carousel-experimental')

        scrollBy(contentElement.value, { direction, vertical: props.vertical })
    }

    const scrollPrev = () => scroll(-1)
    const scrollNext = () => scroll(1)

    const toggleScrollState = async () => {
        const { toggleScrollState } = await import('winduum/src/components/carousel-experimental')

        toggleScrollState(contentElement.value, {
            prevElement: prevElement.value,
            nextElement: nextElement.value,
            vertical: props.vertical
        })
    }

    const scrollToMarker = async (event: Event) => {
        event.preventDefault()

        const target = event.currentTarget as HTMLElement
        const { scrollToMarker } = await import('winduum/src/components/carousel-experimental')

        scrollToMarker(contentElement.value, target, markerGroupElement.value, props.vertical ? { block: 'start' } : {})
    }

    watch(contentElement, (element) => {
        const abortController = new AbortController()

        element?.addEventListener('scrollsnapchanging', async (event: any) => {
            const { setSnappedAttribute } = await import('winduum/src/components/carousel-experimental')

            setSnappedAttribute(element, event.snapTargetInline ?? event.snapTargetBlock, markerGroupElement.value)
        }, { signal: abortController.signal })

        onWatcherCleanup(() => abortController.abort())
    })

    defineExpose({ scrollPrev, scrollNext, toggleScrollState })
</script>

<template>
    <component class="x-carousel-experimental" :is="as">
        <slot
            :scrollPrev="scrollPrev"
            :scrollNext="scrollNext"
            :toggleScrollState="toggleScrollState"
            :scrollToMarker="scrollToMarker"
        ></slot>
    </component>
</template>
