<template>
    <div class="body-form-title row">
        <div class="body-title">
            <h1> Nuevo Producto</h1>
        </div>
        <ComponentForm />
        <div class="row body-button-atras">
            <router-link :to="{ name: 'home' }" class="btn blue">Atras</router-link>
        </div>
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