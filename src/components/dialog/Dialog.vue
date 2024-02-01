<script setup lang="ts">
    import { DefaultOptions } from 'winduum/src/components/dialog/types/index.d.ts'
    import { ref } from 'vue'
    import { showDialog, closeDialog } from 'winduum/src/components/dialog/index.js'

    const root = ref()
    const open = ref(false)

    const show = async (options: DefaultOptions) => {
        open.value = true
        requestAnimationFrame(() => showDialog(root.value, options))
    }

    const close = async () => {
        await closeDialog(root.value)
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
