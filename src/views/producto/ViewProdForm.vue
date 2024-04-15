<template>
    <div class="body-form-title row">
        <div class="body-title">
            <h1> Nuevo Producto</h1>
        </div>
        <ComponentForm />
    </div>
</template>

<script>
import ComponentForm from '@/components/ComponentForm.vue'

export default {
    components: { ComponentForm },
    name: "ViewProdForm"
}
</script>
<style>
.body-button-atras {
    text-align: right;
}

.body-form-title {
    margin-right: 5%;
    margin-left: 5%;
}
</style>