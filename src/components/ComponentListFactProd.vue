<template>
    <div class="row">
        <div class="row body-table">
            <table>
                <thead>
                    <tr class="blue cabecera-table">
                        <td colspan="3">Lista de productos</td>
                    </tr>
                    <tr class="blue cabecera-table">
                        <td>Codigo</td>
                        <td>Nombre</td>
                        <td>Cantidad</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.productos" :key="item.index">
                        <td>{{ item.id }}</td>
                        <td>{{ item.nombre }}</td>
                        <td>{{ item.cant }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <router-link class="btn blue" :to="{ name: 'facturas' }">Atras</router-link>
        </div>
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
<style>
.body-table {
    margin: 15px 50px 20px 50px
}
</style>