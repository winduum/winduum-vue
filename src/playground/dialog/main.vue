<script setup lang="ts">
    import { ref } from 'vue'
    import { Dialog, DialogContent } from '../../components/dialog'
    import { UiBtn } from '../../components/ui/btn'

    interface Props {
        heading?: string
    }

    defineProps<Props>()

    const root = ref()
    const data = ref<Props>({})

    defineExpose({
        root,
        data
    })
</script>

<template>
    <Dialog ref="root">
        <DialogContent>
            <div class="flex-between">
                <div class="ui-heading">Heading</div>
                <UiBtn class="muted square accent-main" @click="root.close()">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </UiBtn>
            </div>
        </DialogContent>
    </Dialog>
</template>
