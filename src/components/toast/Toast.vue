<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue'
    import type { CloseToastOptions, ShowToastOptions } from 'winduum/src/components/toast'
    import { closeToast, showToast } from 'winduum/src/components/toast'

    interface Props {
        as?: string
        showOptions?: ShowToastOptions
        closeOptions?: CloseToastOptions
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'li'
    })

    const emit = defineEmits<{
        close: []
    }>()

    const element = ref<HTMLElement>()
    let timeout: number | undefined

    const close = async () => {
        if (!element.value) return

        window.clearTimeout(timeout)

        await closeToast(element.value, {
            ...props.showOptions?.close,
            ...props.closeOptions,
            remove: false
        })

        emit('close')
    }

    onMounted(async () => {
        if (!element.value) return

        const autoHide = props.showOptions?.autoHide ?? 7500

        await showToast(element.value, {
            ...props.showOptions,
            autoHide: null
        })

        if (autoHide) {
            timeout = window.setTimeout(close, autoHide * (((element.value.parentElement?.children.length ?? 0) + 1) / 2))
        }
    })

    onUnmounted(() => {
        window.clearTimeout(timeout)
    })

    const onClick = (event: MouseEvent) => {
        if ((event.target as HTMLElement).closest('[data-action="closeToast"]')) {
            void close()
        }
    }
</script>

<template>
    <component
        class="x-toast"
        :is="as"
        ref="element"
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        @click="onClick"
    >
        <slot></slot>
    </component>
</template>
