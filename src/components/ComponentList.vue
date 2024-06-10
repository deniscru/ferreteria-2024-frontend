<template>
    <div class="body-list-title margen">
        <div class="row body-boton">
            <div class="botones"><router-link :to="{ name: 'nuevoProducto' }"
                    class=" waves-effect waves-light-green btn blue">Nuevo
                    Producto</router-link>
            </div>
            <div class="botones"><router-link :to="{ name: 'incrementar' }"
                    class=" waves-effect waves-light-green btn blue">Incrementar</router-link>
            </div>
            <div class="botones"><router-link :to="{ name: 'facturas' }"
                    class=" waves-effect waves-light-green btn blue">Facturas</router-link>
            </div>
            <div class="botones"><router-link :to="{ name: 'ventaHoy' }"
                    class=" waves-effect waves-light-green btn blue">Ventas de hoy</router-link>
            </div>
        </div>
        <div class="body-boton row">
            <div class="body-filter">
                <button class="btn blue" @click="obtenerDatos(page, true)">filtrar</button>
            </div>
            <div class="input-field col s3 body-select">
                <select name="select" v-model="tipo">
                    <option value="" disabled selected>Seleccionar tipo</option>
                    <option value="1">Electricidad</option>
                    <option value="2">Plomeria</option>
                    <option value="3">Ferreteria</option>
                    <option value="4">Limpieza</option>
                </select>
            </div>
            <div class="input-field col s6">
                <input id="nombre_prod" type="text" v-model="nombre">
                <label for="nombre_prod">Ingresar Nombre</label>
            </div>
            <div class="body-limpiar">
                <!-- se debe acomodar correctamente el boton cuando aparece-->
                <button class="btn blue" @click="obtenerDatos(1, false)" v-if="filtro">Limpiar</button>
            </div>
        </div>

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
                        <td> {{ item.nombre }}</td>
                        <td> {{ item.precio_de_compra }}</td>
                        <td> {{ item.precio_de_venta }}</td>
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

import axios from 'axios';
import M from 'materialize-css';

export default {
    name: 'ComponentList',
    data() {
        return {
            lista: [],
            tipo: "",
            siguiente: "",
            anterior: "",
            page: 1,
            filtro: false,
            cantFil: true,
            nombre: ""
        };
    },
    mounted() {
        M.AutoInit();
        this.obtenerDatos(this.page, false);
    },
    methods: {
        obtenerDatos(page, filtro) {
            if (this.cantFil && filtro) {
                page = 1;
                this.cantFil = false;
            }
            var direccion = "";
            if (filtro && this.tipo != "" && this.nombre == "") {
                direccion = "http://127.0.0.1:8000/producto/lista/Tipo/" + page + "/" + this.tipo;
                this.filtro = true;
            } else if (filtro && this.tipo == "" && this.nombre != "") {
                direccion = "http://127.0.0.1:8000/producto/lista/Nombre/" + page + "/" + this.nombre;
                this.filtro = true;
            } else if (filtro && this.tipo != "" && this.nombre != "") {
                direccion = "http://127.0.0.1:8000/producto/lista/TipoYNombre/" + page + "/" + this.tipo + "/" + this.nombre;
                this.filtro = true;
            } else if (filtro && this.tipo == "") {
                this.$swal('Advertencia', " Debe seleccionar un tipo", 'error');
                direccion = "http://127.0.0.1:8000/producto/lista/" + page;
            } else {
                direccion = "http://127.0.0.1:8000/producto/lista/" + page;
                this.filtro = false;
                this.tipo = "";
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
tr td {
    border: rgb(137, 200, 241) 2px solid;
    height: 50px;
    font-size: 130%;
}

.altura {
    height: 50px;
}

.button-anterior,
.button-num {
    margin-right: 1%;
}

.button-num {
    background-color: aqua;
}

.centro {
    text-align: center;
}

.cabecera-table td {
    text-align: center;
    color: black;
}

.margen {
    margin-left: 4%;
    margin-right: 4%;
}

.botones {
    float: right;
    margin: 0 0 0 8px;
}

.body-filter {
    float: left;
}

.body-select {
    height: 36px;
}

.body-boton-pagi {
    margin-top: 2%;
}

.body-boton {
    text-align: right;
    margin-top: 2%;
    margin-left: 1%;
}
</style>