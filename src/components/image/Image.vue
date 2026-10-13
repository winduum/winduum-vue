<script setup lang="ts">
    import { onMounted, ref } from 'vue'

    interface Props {
        as?: string
    }

    withDefaults(defineProps<Props>(), {
        as: 'div'
    })

    const image = ref<HTMLElement | null>(null)

    onMounted(() => {
        const element = image.value?.querySelector('img, video, iframe')

        if (!element) return

        const removeSkeleton = () => image.value?.classList.remove('before:skeleton')

        if ('complete' in element && element.complete) removeSkeleton()
        else if (element instanceof HTMLVideoElement) element.oncanplay = removeSkeleton
        else element.addEventListener('load', removeSkeleton, { once: true })
    })
</script>

<template>
    <component class="x-image" :is="as" ref="image">
        <slot></slot>
    </component>
</template>
