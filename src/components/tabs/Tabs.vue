<script setup lang="ts">
    import type { ComponentPublicInstance } from 'vue'
    import { computed } from 'vue'

    type ElementRef = ComponentPublicInstance | HTMLElement | null

    interface Props {
        as?: string
        refs?: {
            tabElements?: ElementRef[]
            tabPanelElements?: ElementRef[]
        }
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'div'
    })

    const unwrapElement = (ref: ElementRef) => ((ref as ComponentPublicInstance)?.$el ?? ref) as Element | null
    const tabElements = computed(() => props.refs?.tabElements?.map(unwrapElement).filter((element): element is Element => !!element) ?? [])
    const tabPanelElements = computed(() => props.refs?.tabPanelElements?.map(unwrapElement).filter((element): element is Element => !!element) ?? [])

    const toggleTab = async (event: Event) => {
        const source = event.currentTarget as HTMLElement
        const { toggleTab } = await import('winduum/src/components/tabs')

        toggleTab(source, {
            tabElements: tabElements.value,
            tabPanelElements: tabPanelElements.value
        })
    }
</script>

<template>
    <component class="x-tabs" :is="as">
        <slot :toggleTab="toggleTab"></slot>
    </component>
</template>
