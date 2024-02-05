<script setup lang="ts">
    import { ref } from 'vue'
    import type { DefaultOptions } from "winduum/src/components/dialog"
    import { showDialog, closeDialog } from 'winduum/src/components/dialog'

    const root = ref()
    const open = ref(false)

    const show = async (options: DefaultOptions) => {
        open.value = true
        requestAnimationFrame(() => showDialog(root.value, options))
    }

    const close = async (options: DefaultOptions) => {
        await closeDialog(root.value, options)
        open.value = false
    }

    defineExpose({
        show,
        close
    })
</script>

<template>
    <dialog class="c-dialog" v-if="open" ref="root" @c-dialog:dismiss="open = false">
        <slot :close="close"></slot>
    </dialog>
</template>
