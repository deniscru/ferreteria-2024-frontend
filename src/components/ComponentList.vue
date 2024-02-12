<template>
    <div class="body-list-title margen">
        <div class="body-boton row">
            <div class="body-boton-agregar"><router-link :to="{ name: 'nuevoProducto' }"
                    class=" waves-effect waves-light-green btn blue">Nuevo
                    Producto</router-link>
            </div>
            <!-- En este link redirige a una lista de producto para seleccionar e ingrementar un prorcentaje
                Tambien va a tener un filtrado por tipo de producto-->
            <div class="body-boton-precio"><router-link :to="{ name: 'nuevoProducto' }"
                    class=" waves-effect waves-light-green btn blue margen_boton">Incrementar Precios</router-link>
                <!-- falta un filtrado por tipo-->
            </div>
            <div class="body-filter">
                <button class="btn blue">filtrar</button>
            </div>
            <div class="col s6 body-select">
                <select name="select" class="selector">
                    <option value=" " disabled selected>Seleccionar</option>
                    <option value="1">Electricidad</option>
                    <option value="2">Plomeria</option>
                    <option value="3">Ferreteria</option>
                    <option value="4">Limpieza</option>
                </select>
            </div>
        </div>
        <div class="tabla">
            <table class="striped">
                <thead>
                    <tr class="blue cabecera-table">
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
                        <td> <router-link :to="{ name: 'nuevoProducto' }"
                                class=" waves-effect waves-light-green btn red">Detalle</router-link> </td>
                        <td> <router-link :to="{ name: 'editarProducto', params: { id: item.id } }"
                                class=" waves-effect waves-light-green btn blue">Editar</router-link> </td>
                        <td> <button class="waves-effect waves-light btn-small">Eliminar</button> </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="body-boton-pagi row">
            <button class="btn button-anterior">Anterior</button>
            <button class="btn">Sigueinte</button>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import M from 'materialize-css';

export default {
    name: 'ComponentList',
    data() {
        return {
            lista: [],
            tipo: []
        };
    },
    mounted() {
        M.AutoInit();
        this.obtenerDatos();
    },
    methods: {

        obtenerDatos() {
            axios.get("http://127.0.0.1:8000/producto/lista/1/").then((response) => {
                this.lista = response.data.items;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
            });

        },
        eliminar() {

        }
    }
}
</script>

<style>
.body-boton {
    text-align: right;
    margin-top: 2%;
}

.button-anterior {
    margin-right: 1%;
}

.body-boton-agregar,
.body-boton-precio {
    float: right;
}

.body-filter {
    float: left;
}

.body-boton-agregar {
    margin-left: 1%;
}

.body-select {
    height: 36px;
}

.cabecera-table td {
    text-align: center;
    color: black;
}

.margen {
    margin-left: 4%;
    margin-right: 4%;
}
</style>