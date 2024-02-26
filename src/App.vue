<script setup lang="ts">
    import { ref, nextTick } from 'vue'
    import { UiBtn } from './components/ui/btn'
    import DialogMain from './playground/dialog/main.vue'
    import { Tooltip } from "./components/tooltip"
    import { Popover, PopoverContent } from "./components/popover"

    const dialogMain = ref()
    const dialogMainProps = ref({})

    const showDialog = async () => {
        dialogMainProps.value = {
            heading: 'Hello there',
            name: 'haha'
        }

        await nextTick()

        dialogMain.value.root.show({
            closable: true
        })

    }
</script>

<template>
    <div class="flex-center p-6">
        <Tooltip class="bottom" aria-label="Opens a dialog">
            <UiBtn class="muted" @click="showDialog">Open Dialog</UiBtn>
        </Tooltip>

        <Popover>
            <UiBtn class="md:bordered">Show dropdown</UiBtn>
            <PopoverContent class="shadow mt-2">This is a popover</PopoverContent>
        </Popover>
    </div>

    <Teleport to="body">
        <DialogMain ref="dialogMain" v-bind="dialogMainProps" :key="dialogMainProps" />
    </Teleport>
</template>
