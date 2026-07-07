<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'

    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'ol'
    })

    const element = ref<HTMLElement>()
    let observer: MutationObserver | undefined

    onMounted(async () => {
        if (!element.value) return

        const { toasterObserver } = await import('winduum/src/components/toaster/index.js') as unknown as {
            toasterObserver: () => MutationObserver
        }

        const nextObserver = toasterObserver()
        nextObserver.observe(element.value, { childList: true })
        observer = nextObserver
    })

    onUnmounted(() => {
        observer?.disconnect()
    })
</script>

<template>
    <component class="x-toaster" :is="as" ref="element" popover="manual">
        <slot></slot>
    </component>
</template>
