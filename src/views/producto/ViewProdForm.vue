<template>
    <div class="body-form-title">
        <div class="body-title">
            <h1> Nuevo Producto</h1>
        </div>
        <ComponentForm />
        <router-link :to="{ name: 'home' }" class="btn blue">Atras</router-link>
    </div>
</template>

<script>
import ComponentForm from '@/components/ComponentForm.vue'

export default {
    components: { ComponentForm },
    name: "ViewProdForm"
}
</script>
<style></style>