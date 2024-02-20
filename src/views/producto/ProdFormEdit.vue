<template>
    <div class="body-edit">
        <div class="body-title-edit">
            <h1>Editar</h1>
        </div>
        <ComponentFormEdit />
    </div>
</template>

<script>

import ComponentFormEdit from '@/components/ComponentFormEdit.vue';

export default {
    name: "ProdFromEditVue",
    components: {
        ComponentFormEdit
    }
}

</script>

<style></style>