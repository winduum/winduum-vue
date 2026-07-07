<script setup lang="ts">
    import { ref } from 'vue'
    import { toggleTab } from 'winduum/src/components/tabs'

    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'div'
    })

    const element = ref<HTMLElement>()

    const toggle = (event: MouseEvent) => {
        const tabElement = (event.target as HTMLElement).closest('[role="tab"]')

        if (!tabElement || !element.value?.contains(tabElement)) return

        toggleTab(tabElement, {
            tabElements: element.value.querySelectorAll('[role="tab"]'),
            tabPanelElements: element.value.querySelectorAll('[role="tabpanel"]')
        })
    }
</script>

<template>
    <component class="x-tabs" :is="as" ref="element" @click="toggle">
        <slot></slot>
    </component>
</template>
