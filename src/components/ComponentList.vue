<template>
    <div class="body-list-title margen">
        <div class="body-boton-agregar">
            <div class="boton-agregar">
                <router-link :to="{ name: 'nuevoProducto' }" class=" waves-effect waves-light-green btn blue">Nuevo
                    Producto</router-link>
                <!-- En este link redirige a una lista de producto para seleccionar e ingrementar un prorcentaje
                Tambien va a tener un filtrado por tipo de producto-->
                <router-link :to="{ name: 'nuevoProducto' }" class=" waves-effect waves-light-green btn blue">Incrementar
                    precios</router-link>
                <!-- falta un filtrado por tipo-->
            </div>
        </div>
        <div class="tabla">
            <table class="striped">
                <thead>
                    <tr class="blue">
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
            lista: [],
        };
    },
    mounted() {
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