<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'

    type PopoverOptions = boolean | Record<string, unknown>
    const supportsAnchor = CSS.supports('anchor-name', '--')
    const supportsAnchoredContainer = CSS.supports('container-type: anchored')

    interface Props {
        as?: string
        autoUpdate?: PopoverOptions
        placement?: string
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'div',
        placement: 'bottom'
    })

    const element = ref<HTMLElement>()
    let open = false
    let cleanup: (() => void) | undefined
    let sourceElement: HTMLElement | undefined

    const onToggle = ((event: ToggleEvent) => {
        open = event.newState === 'open'

        if (sourceElement?.ariaExpanded) sourceElement.ariaExpanded = `${open}`
    }) as EventListener

    const showPopover = async (options?: { source?: HTMLElement }) => {
        const popoverElement = element.value
        const source = options?.source

        if (!popoverElement) return

        sourceElement = source

        if (source && ((props.autoUpdate && !supportsAnchoredContainer) || !supportsAnchor)) {
            const { autoUpdatePopover } = await import('winduum/src/components/popover/index.js')

            cleanup = await autoUpdatePopover(source, popoverElement, props.placement as never, props.autoUpdate as never)
        }

        ;(HTMLElement.prototype.showPopover as (this: HTMLElement, options?: { source?: HTMLElement }) => void).call(popoverElement, options)
    }

    const hidePopover = () => {
        cleanup?.()
        cleanup = undefined

        if (!element.value) return

        ;(HTMLElement.prototype.hidePopover as (this: HTMLElement) => void).call(element.value)
    }

    const togglePopover = (options?: { source?: HTMLElement }) => {
        !open
            ? void showPopover(options)
            : hidePopover()
    }

    onMounted(() => {
        const popoverElement = element.value

        if (!popoverElement) return

        ;(popoverElement as any).showPopover = showPopover
        ;(popoverElement as any).hidePopover = hidePopover
        ;(popoverElement as any).togglePopover = togglePopover
        popoverElement.addEventListener('toggle', onToggle)
    })

    onUnmounted(() => {
        if (!element.value) return

        cleanup?.()
        element.value.removeEventListener('toggle', onToggle)
        delete (element.value as Partial<HTMLElement>).showPopover
        delete (element.value as Partial<HTMLElement>).hidePopover
        delete (element.value as Partial<HTMLElement>).togglePopover
    })
</script>

<template>
    <component class="x-popover" :is="as" ref="element">
        <slot></slot>
    </component>
</template>
