<script setup lang="ts">
    import type { ComponentPublicInstance } from 'vue'
    import { computed, onWatcherCleanup, ref, watch } from 'vue'
    import type { DrawerPlacement } from 'winduum/src/components/drawer'

    type ElementRef = ComponentPublicInstance | HTMLElement | null

    interface Props {
        placement?: DrawerPlacement
        modal?: boolean
        refs?: {
            contentElement?: ElementRef
        }
    }

    const props = withDefaults(defineProps<Props>(), {
        placement: 'left',
        modal: true
    })

    const element = ref<HTMLDialogElement>()
    const contentElement = computed(() => (props.refs?.contentElement as ComponentPublicInstance)?.$el ?? props.refs?.contentElement)

    const showModal = async () => {
        const drawerElement = element.value
        const scrollerElement = drawerElement?.firstElementChild

        if (!drawerElement || !scrollerElement || drawerElement.open) return

        if (props.modal) HTMLDialogElement.prototype.showModal.call(drawerElement)
        else HTMLDialogElement.prototype.show.call(drawerElement)

        const { showDrawer } = await import('winduum/src/components/drawer')

        void showDrawer(scrollerElement, props.placement)
    }

    watch(contentElement, (contentElement) => {
        const drawerElement = element.value

        if (!drawerElement || !contentElement) return

        const abortController = new AbortController()
        let observer: IntersectionObserver | undefined

        drawerElement.showModal = showModal

        void import('winduum/src/components/drawer').then(({ drawerEvents, drawerObserver }) => {
            if (abortController.signal.aborted) return

            drawerEvents(drawerElement, contentElement, props.placement, abortController.signal)

            observer = drawerObserver(drawerElement, props.placement)
            observer.observe(contentElement)
        })

        onWatcherCleanup(() => {
            delete (drawerElement as Partial<HTMLDialogElement>).showModal
            abortController.abort()
            observer?.disconnect()
        })
    })
</script>

<template>
    <dialog ref="element" class="x-drawer">
        <slot></slot>
    </dialog>
</template>
