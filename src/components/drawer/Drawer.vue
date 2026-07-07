<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'
    import type { DrawerPlacement } from 'winduum/src/components/drawer'
    import { drawerEvents, drawerObserver, showDrawer } from 'winduum/src/components/drawer'

    interface Props {
        placement?: DrawerPlacement
        modal?: boolean
    }

    const props = withDefaults(defineProps<Props>(), {
        placement: 'left',
        modal: true
    })

    const element = ref<HTMLDialogElement>()

    let abortController: AbortController | undefined
    let observer: IntersectionObserver | undefined

    const showModal = () => {
        const drawerElement = element.value
        const scrollerElement = drawerElement?.firstElementChild

        if (!drawerElement || !scrollerElement || drawerElement.open) return

        if (props.modal) HTMLDialogElement.prototype.showModal.call(drawerElement)
        else HTMLDialogElement.prototype.show.call(drawerElement)

        void showDrawer(scrollerElement, props.placement)
    }

    onMounted(() => {
        const drawerElement = element.value
        const contentElement = drawerElement?.querySelector<HTMLElement>('[data-x-drawer-part="content"], .x-drawer-content')

        if (!drawerElement || !contentElement) return

        abortController = new AbortController()
        drawerElement.showModal = showModal

        drawerEvents(drawerElement, contentElement, props.placement, abortController.signal)

        observer = drawerObserver(drawerElement, props.placement)
        observer?.observe(contentElement)
    })

    onUnmounted(() => {
        if (element.value) delete (element.value as Partial<HTMLDialogElement>).showModal

        abortController?.abort()
        observer?.disconnect()
    })
</script>

<template>
    <dialog ref="element" class="x-drawer">
        <slot></slot>
    </dialog>
</template>
