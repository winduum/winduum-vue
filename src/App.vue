<script setup lang="ts">
    import { useId } from 'vue'
    import { Button } from './components/button'
    import DialogMain from './playground/dialog/main.vue'
    import { Tooltip } from "./components/tooltip"
    import { Popover, PopoverContent } from "./components/popover"

    const dialogMain = useId()
    const popoverMain = useId()
</script>

<template>
    <div class="flex items-center gap-2 p-6">
        <Tooltip class="tooltip-bottom" aria-label="Opens a dialog">
            <Button class="muted" command="show-modal" :commandfor="dialogMain">Open Dialog</Button>
        </Tooltip>

        <Button class="md:bordered" command="toggle-popover" :commandfor="popoverMain" :aria-controls="popoverMain">Show dropdown</Button>
        <Popover class="bottom my-2" popover :id="popoverMain">
            <PopoverContent class="shadow p-2">This is a popover</PopoverContent>
        </Popover>
    </div>

    <Teleport to="body">
        <DialogMain :id="dialogMain" heading="Hello there" name="haha" />
    </Teleport>
</template>
