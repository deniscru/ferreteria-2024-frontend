<template>
    <div class=" margen">
        <div class="body-boton row">
            <div class="body-filter">
                <button class="btn blue" @click="filtrar(1, true, true)">Buscar</button>
            </div>
            <div class="input-field col s3">
                <input id="nombre_prod" type="text" v-model="dato">
                <label for="nombre_prod">Ingresar el Nombre o Codigo</label>
            </div>
            <div class="body-limpiar">
                <!-- se debe acomodar correctamente el boton cuando aparece-->
                <button class="btn blue" @click="filtrar(1, false, false)" v-if="filtro">Limpiar</button>
            </div>
            <div class="body-limpiar">
                <!-- se debe acomodar correctamente el boton cuando aparece-->
                <button class="btn blue" @click="activarIncrementar(true)" v-if="!this.activado">Activar
                    Incrementacion</button>
                <button class="btn blue" @click="activarIncrementar(false)" v-if="this.activado">Desactivar</button>
            </div>
            <div class="body-limpiar">
                <!-- se debe acomodar correctamente el boton cuando aparece-->
                <button class="btn blue" @click="incrementar()" v-if="this.activado">Incrementar</button>
            </div>
            <div class="input-field col s3" v-if="activado">
                <input id="porcentaje" type="number" min="1" max="100" class="validate" required v-model="cant">
                <label for="porcentaje" translate="no">Ingresar el porcentaje</label>
            </div>
        </div>
        <div class="tabla" v-if="this.listP">
            <table class="striped">
                <thead>
                    <tr class="blue cabecera-table">
                        <td>Codigo</td>
                        <td>Nombre</td>
                        <td>Precio de Compra</td>
                        <td>Precio de Venta</td>
                        <td>Fecha de Precio Actu.</td>
                        <td colspan="2">Botones </td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.lista" :key="item.index">
                        <td class="centro"> {{ parseInt(item.id) }}</td>
                        <td v-if="activado"> <label class="label-nombre">
                                <input type="checkbox" v-bind:id="'input' + item.id" value="1" />
                                <span class="nombre">
                                    {{ item.nombre.toUpperCase() }}
                                </span>
                            </label></td>
                        <td v-else>{{ item.nombre.toUpperCase() }}</td>
                        <td> {{ "$" + item.precio_de_compra }}</td>
                        <td> {{ "$" + item.precio_de_venta }}</td>
                        <td> {{ item.date }}</td>
                        <td class="centro"> <router-link :to="{ name: 'editarProducto', params: { id: item.id } }"
                                class=" waves-effect waves-light-green btn blue">Editar</router-link> </td>
                        <td class="centro"> <button class="waves-effect waves-light btn red delete"
                                @click="eliminar(item.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row mensajeVacio" v-else-if="this.filtro">
            <h1>{{ this.mensajeFiltro }}</h1>
        </div>
        <div class="row mensajeVacio" v-else>
            <h1>{{ this.mensajeLista }}</h1>
        </div>
        <div class="body-boton-pagi row">
            <button class="btn button-anterior" v-if="anterior != null"
                @click="filtrar(anterior, filtro, false)">Anterior</button>
            <button class="btn button-num" disabled v-if="anterior != null || siguiente != null">{{ page }}</button>
            <button class="btn" v-if="siguiente != null" @click="filtrar(siguiente, filtro, false)">Siguiente</button>
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
            listP: false,
            mensajeFiltro: "No se encontro el/los Producto/s buscado",
            mensajeLista: "No posee productos cargados",
            tipo: "",
            siguiente: null,
            anterior: null,
            page: 1,
            filtro: false,
            dato: "",
            ignorar: true,
            activado: false,
            cant: ""
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
        filtrar(page, filtro, ignorar) {
            let direccion;
            if ((this.dato == "" || parseInt(this.dato) < 0) && ignorar) {
                this.$swal('Advertencia', " Ingrese un valor correcto, Ej: 'cinta' o '5'", 'error');
                return null;
            }
            this.page = page;
            if (filtro) {
                this.filtro = true;
                if (this.tipo != "0") {
                    /*filtrado por un tipo de producto y un nombre o codigo*/
                    direccion = "http://127.0.0.1:8000/producto/lista/TipoYNombreOCodigo/" + page + "/" + this.tipo + "/" + this.dato;
                } else {
                    /*filtrado por todos los tipos de producto y un nombre o codigo*/
                    direccion = "http://127.0.0.1:8000/producto/lista/NombreOCodigo/" + page + "/" + this.dato;
                }
            } else {
                this.obtenerDatos(page);
                this.filtro = false;
                return null;
            }
            this.realizarPedido(direccion);
        },
        realizarPedido(direccion) {
            axios.get(direccion).then((response) => {
                this.lista = response.data.items;
                this.siguiente = response.data.siguiente;
                this.anterior = response.data.anterior;
                this.page = response.data.actual;
                if (this.lista.length > 0) {
                    this.listP = true;
                } else {
                    this.listP = false;
                }
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
        activarIncrementar(activado) {
            this.activado = activado;
        },
        incrementar() {
            //debo incrementar los productos seleccionados en la tabla con el valor ingresado
            if (this.cant != "") {
                var lis = this.obtenerProdSelec();
                var dato = {
                    "porcentaje": this.cant,
                    "lista": lis,
                }
                axios.post("http://127.0.0.1:8000/producto/actualizar/data", dato).then((response) => {
                    this.$swal.fire({
                        title: response.data.mensaje,
                        confirmButtonText: 'Aceptar',
                    }).then((result) => {
                        console.log(result);
                        this.obtenerDatos(this.page)
                    })
                }).catch((error) => { this.$swal("Error", error.response.data.error, "error") })
            } else {
                this.$swal.fire({
                    title: 'Debe ingrezar un porcentaje, ej: del 1 al 100',
                    confirmButtonText: 'Aceptar',
                }).then((result) => {
                    console.log(result);
                })
            }
        },
        obtenerProdSelec() {
            var lis = [];
            for (var prod of this.lista) {
                if (document.getElementById("input" + prod.id).checked) {
                    lis.push(prod.id);
                }
            }
            return lis
        }
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
    margin-left: 5px;
    margin-right: auto;
    margin-top: 20px;
}
</style>