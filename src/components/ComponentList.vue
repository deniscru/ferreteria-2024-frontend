<template>
    <div class="body-list-title margen">
        <div class="body-boton-agregar">
            <div class="boton-agregar">
                <button class="waves-effect waves-light-green btn blue">Nuevo Producto</button>
            </div>
        </div>
        <div class="tabla">
            <table class="striped">
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Precio de Compra</td>
                        <td>Precio de Venta</td>
                        <td colspan="3">Botones </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.lista" :key="item.index">
                        <td> {{ item.nombre }}</td>
                        <td> {{ item.precio_de_compra }}</td>
                        <td> {{ item.precio_de_venta }}</td>
                        <td> <button class="waves-effect waves-light btn-small">Detalle</button> </td>
                        <td> <button class="waves-effect waves-light btn-small">Editar</button> </td>
                        <td> <button class="waves-effect waves-light btn-small">Eliminar</button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'ComponentList',
    data() {
        return {
            nombre: "",
            lista: [],
        };
    },
    mounted() {
        this.nombre = this.$route.params.id;
        this.obtenerDatos();
    },
    methods: {
        obtenerDatos() {
            axios.get("http://127.0.0.1:8000/producto/lista/1/").then((response) => {
                this.lista = response.data.items;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
            });

        }
    }
}
</script>

<style>
.body-boton-agregar {
    text-align: right;
    margin-bottom: 3%;
    margin-top: 3%;
}

.margen {
    margin-left: 4%;
    margin-right: 4%;
}
</style>