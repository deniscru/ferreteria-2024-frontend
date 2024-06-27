<template>
    <div class="row">

    </div>
</template>
<script>

import axios from "axios";
import M from "materialize-css";

export default {
    name: "ComponentListFactProd",
    data() {
        return {
            idFactura: null,
            productos: null,
        }
    },
    mounted() {
        M.AutoInit();
        this.obtenerDatos();
    },
    methods: {
        obtenerDatos() {
            this.idFactura = localStorage.getItem("idFactura");
            axios.get(
                "http://127.0.0.1:8000/factura/lista/productos/" + this.idFactura
            ).then((response) => {
                this.productos = response.data.lista;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
            })
        }
    }
}

</script>
<style></style>