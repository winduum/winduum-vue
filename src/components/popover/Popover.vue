<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'
    import { onCommand } from '../../index.js'
    import { supportsAnchor, supportsAnchoredContainer } from 'winduum/src/common.js'
    import type { ComputePositionConfig, Placement } from '@floating-ui/dom'

    interface Props {
        as?: string
        autoUpdate?: boolean | ComputePositionConfig
        placement?: Placement
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'div',
        placement: 'bottom'
    })

    const element = ref<HTMLElement>()
    let abortController: AbortController | undefined
    let cleanup: (() => void) | undefined
    let sourceElement: HTMLElement | undefined

    const nativeShowPopover = HTMLElement.prototype.showPopover as (this: HTMLElement, options?: { source?: HTMLElement }) => void
    const nativeHidePopover = HTMLElement.prototype.hidePopover

    const onToggle = ((event: ToggleEvent) => {
        if (sourceElement?.ariaExpanded) sourceElement.ariaExpanded = `${event.newState === 'open'}`
    }) as EventListener

    const showPopover = async (options?: { source?: HTMLElement }) => {
        const popoverElement = element.value
        const source = options?.source

        if (!popoverElement) return

        sourceElement = source

        if (source && ((props.autoUpdate && !supportsAnchoredContainer) || !supportsAnchor)) {
            const { autoUpdatePopover } = await import('winduum/src/components/popover/index.js')

            cleanup = await autoUpdatePopover(source, popoverElement, props.placement, props.autoUpdate)
        }

        nativeShowPopover.call(popoverElement, options)
    }

    const hidePopover = () => {
        cleanup?.()
        cleanup = undefined

        if (element.value) nativeHidePopover.call(element.value)
    }

    const togglePopover = (options?: { source?: HTMLElement }) => {
        element.value?.matches(':popover-open')
            ? hidePopover()
            : void showPopover(options)
    }

    onMounted(() => {
        const popoverElement = element.value

        if (!popoverElement) return

        abortController = new AbortController()

        Object.assign(popoverElement, { showPopover, hidePopover, togglePopover })
        popoverElement.addEventListener('toggle', onToggle, { signal: abortController.signal })
        popoverElement.addEventListener('command', onCommand, { signal: abortController.signal })
    })

    onUnmounted(() => {
        cleanup?.()
        abortController?.abort()
    })
</script>

<template>
    <component class="x-popover" :is="as" ref="element">
        <slot></slot>
    </component>
</template>
