<template>
    <div class="body-component-factura">
        <ComponentFormFactura />
    </div>
</template>
<script>
import ComponentFormFactura from '@/components/ComponentFormFactura.vue'

export default {
    name: "ViewFacturaForm.vue",
    components: {
        ComponentFormFactura
    }
}
</script>