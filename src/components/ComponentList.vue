<template>
    <div class="body-list-title">
        <div class="title_list">
            <h1>{{ this.$route.params.id }}</h1>
        </div>
        <div class="tabla">
            <table class="striped">
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Precio de Compra</td>
                        <td>Precio de Venta</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.lista" :key="item.index">
                        <td> {{ item.nombre }}</td>
                        <td> {{ item.precio_de_compra }}</td>
                        <td> {{ item.precio_de_venta }}</td>
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
            axios.get("http://127.0.0.1:8000/producto/listaTipo/1/" + this.$route.params.id).then((response) => {
                this.lista = response.data.items;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
            });

        }
    }
}
</script>

