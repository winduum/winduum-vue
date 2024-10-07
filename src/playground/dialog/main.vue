<script setup lang="ts">
    import { ref } from 'vue'
    import { Dialog, DialogContent } from '../../components/dialog'
    import { Button } from '../../components/button'

    interface Props {
        heading?: string
        name?: string
    }

    const props = defineProps<Props>()
    const root = ref()
    const name = ref(props.name)

    defineExpose({
        root
    })
</script>

<template>
    <Dialog ref="root">
        <DialogContent>
            <div class="flex-between">
                <div class="ui-heading">{{ heading }}</div>
                <input type="text" v-model="name">
                <Button class="muted square accent-main" @click="root.close()">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>
