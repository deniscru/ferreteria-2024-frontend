<template>
    <div class=" margen">
        <div class="body-boton row">
            <div class="body-filter">
                <button class="btn blue" @click="filtrar(1, true)">Buscar</button>
            </div>
            <div class="input-field col s6">
                <input id="nombre_prod" type="text" v-model="dato">
                <label for="nombre_prod">Ingresar el Nombre o Codigo</label>
            </div>
            <div class="body-limpiar">
                <!-- se debe acomodar correctamente el boton cuando aparece-->
                <button class="btn blue" @click="filtrar(1, false)" v-if="filtro">Limpiar</button>
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
            dato: "",
        };
    },
    mounted() {
        M.AutoInit();
        this.tipo = this.$route.params.tipo;
        this.obtenerDatos(this.page);
    },
    methods: {
        obtenerDatos(page) {
            var direccion = "";
            if (this.tipo != "0") {
                direccion = "http://127.0.0.1:8000/producto/lista/Tipo/" + page + "/" + this.tipo;
            } else {
                direccion = "http://127.0.0.1:8000/producto/lista/" + page;
            }
            this.realizarPedido(direccion);
        },
        filtrar(page, filtro) {
            let direccion;
            if (this.dato == "") {
                this.$swal('Advertencia', " Debe ingresar un valor", 'error');
                return null;
            }
            if (filtro) {
                this.filtro = true;
                console.log(Number.isInteger(this.dato));
                if (parseInt(this.dato) > 0) {
                    /* Falta implementar la url en el backend*/
                    console.log("falta implementar la API");
                    direccion = "http://127.0.0.1:8000/producto/lista/" + page;
                } else if (this.tipo == "0" && !parseInt(this.dato)) {
                    /* filtrado de todos y por un nombre */
                    direccion = "http://127.0.0.1:8000/producto/lista/Nombre/" + page + "/" + this.dato;
                } else if (Number.parseInt(this.dato) < 0) {
                    /* tirar un mensaje que el valor ingresado no es valido */
                    console.log("dato ingresado no es valido");
                    direccion = "http://127.0.0.1:8000/producto/lista/" + page;
                } else {
                    direccion = "http://127.0.0.1:8000/producto/lista/TipoYNombre/" + page + "/" + this.tipo + "/" + this.dato;
                }
            } else {
                direccion = "http://127.0.0.1:8000/producto/lista/Tipo/" + page + "/" + this.tipo;
            }
            console.log(direccion);
            this.realizarPedido(direccion);
        },
        realizarPedido(direccion) {
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

.body-boton {
    text-align: right;
}

.body-filter {
    float: left;
    margin: 20px 0 0 0;
}

.body-limpiar {
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}
</style>