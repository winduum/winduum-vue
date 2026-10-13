<script setup lang="ts">
    import type { ComponentPublicInstance } from 'vue'
    import type { ScrollCarouselOptions } from 'winduum/src/components/carousel'
    import { ref, watch } from 'vue'
    import { observeCarousel, scrollCarousel } from 'winduum/src/components/carousel/index.js'

    type ElementRef = ComponentPublicInstance | HTMLElement | null

    interface Props {
        as?: string
        refs?: {
            contentElement?: ElementRef
            prevElement?: ElementRef
            nextElement?: ElementRef
            paginationElement?: ElementRef
        }
    }

    const props = withDefaults(defineProps<Props>(), { as: 'div' })
    const rootElement = ref<HTMLElement>()
    const contentElement = ref<HTMLElement>()
    const prevElement = ref<HTMLButtonElement>()
    const nextElement = ref<HTMLButtonElement>()

    const scrollPrev = () => {
        const itemElement = contentElement.value?.children[0] as HTMLElement | undefined

        contentElement.value?.scroll({
            left: contentElement.value.scrollLeft - (itemElement?.offsetWidth ?? 0)
        })
    }

    const scrollNext = () => {
        const itemElement = contentElement.value?.children[0] as HTMLElement | undefined

        contentElement.value?.scroll({
            left: contentElement.value.scrollLeft + (itemElement?.offsetWidth ?? 0)
        })
    }

    const setScrollPos = () => {
        const maxScrollLeft = (contentElement.value?.scrollWidth ?? 0) - (contentElement.value?.clientWidth ?? 0)
        const scrollStart = (contentElement.value?.scrollLeft ?? 0) <= 0
        const scrollEnd = (contentElement.value?.scrollLeft ?? 0) >= maxScrollLeft

        if (prevElement.value && nextElement.value) {
            prevElement.value.disabled = scrollStart
            nextElement.value.disabled = scrollEnd
        }

        rootElement.value?.toggleAttribute('data-scroll-start', scrollStart)
        rootElement.value?.toggleAttribute('data-scroll-end', scrollEnd)
        rootElement.value?.toggleAttribute('data-scroll-none', maxScrollLeft === 0)
    }

    const onScroll = (event: Event, options?: ScrollCarouselOptions) => {
        if (!(event.currentTarget instanceof Element)) return

        scrollCarousel(event.currentTarget, options)
        setScrollPos()
    }

    watch(
        () => props.refs,
        (refs, _, onCleanup) => {
            contentElement.value = ((refs?.contentElement as ComponentPublicInstance)?.$el ?? refs?.contentElement) as HTMLElement | undefined
            prevElement.value = ((refs?.prevElement as ComponentPublicInstance)?.$el ?? refs?.prevElement) as HTMLButtonElement | undefined
            nextElement.value = ((refs?.nextElement as ComponentPublicInstance)?.$el ?? refs?.nextElement) as HTMLButtonElement | undefined

            if (!contentElement.value) return

            const observer = observeCarousel(contentElement.value)

            scrollCarousel(contentElement.value)
            setScrollPos()

            onCleanup(() => observer.disconnect())
        },
        { immediate: true }
    )

    defineExpose({ setScrollPos })
</script>

<template>
    <component ref="rootElement" class="x-carousel" :is="as">
        <slot
            :scrollPrev="scrollPrev"
            :scrollNext="scrollNext"
            :setScrollPos="setScrollPos"
            :scrollCarousel="scrollCarousel"
            :onScroll="onScroll"
        ></slot>
    </component>
</template>
