<template>
    <div class="body-list-title margen">
        <div class="tabla">
            <table class="striped">
                <thead>
                    <tr class="blue cabecera-table">
                        <td>Codigo</td>
                        <td>Nombre</td>
                        <td>Precio de Compra</td>
                        <td>Precio de Venta</td>
                        <td colspan="2">Botones </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.lista" :key="item.index">
                        <td class="centro"> {{ parseInt(item.id) }}</td>
                        <td> {{ item.nombre.toUpperCase() }}</td>
                        <td> {{ "$" + item.precio_de_compra }}</td>
                        <td> {{ "$" + item.precio_de_venta }}</td>
                        <td class="centro"> <router-link :to="{ name: 'editarProducto', params: { id: item.id } }"
                                class=" waves-effect waves-light-green btn blue">Editar</router-link> </td>
                        <td class="centro"> <button class="waves-effect waves-light btn red delete"
                                @click="eliminar(item.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="body-boton-pagi row">
            <button class="btn button-anterior" v-if="anterior != null"
                @click="obtenerDatos(anterior, filtro)">Anterior</button>
            <button class="btn button-num" disabled v-if="anterior != null || siguiente != null">{{ page }}</button>
            <button class="btn" v-if="siguiente != null" @click="obtenerDatos(siguiente, filtro)">Siguiente</button>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css'
import axios from 'axios';

export default {
    name: 'ListComponent',
    data() {
        return {
            lista: [],
            tipo: "",
            siguiente: "",
            anterior: "",
            page: 1,
            filtro: false,
            nombre: ""
        };
    },
    mounted() {
        M.AutoInit();

        this.obtenerDatos(this.page, false);
    },
    methods: {
        obtenerDatos(page) {
            this.tipo = this.$route.params.tipo;
            console.log(this.tipo);
            var direccion = "";
            if (this.tipo != "0") {
                direccion = "http://127.0.0.1:8000/producto/lista/Tipo/" + page + "/" + this.tipo;
            } else {
                direccion = "http://127.0.0.1:8000/producto/lista/" + page;
                this.filtro = false;
            }
            axios.get(direccion).then((response) => {
                this.lista = response.data.items;
                this.siguiente = response.data.siguiente;
                this.anterior = response.data.anterior;
                this.page = response.data.actual;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error').response
            });
        },
        eliminar(id) {
            this.$swal.fire({
                title: 'Seguro que desea eliminar?',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post("http://127.0.0.1:8000/producto/eliminarProducto/" + id).then((response) => {
                        console.log(response.data);
                        this.obtenerDatos(1);
                    }).catch((error) => {
                        this.$swal('Error', error.response.data.error, 'error')
                    })
                }
            })
        },
    }
}
</script>

<style>
.margen {
    margin: 0 40px 0 40px;
}
</style>