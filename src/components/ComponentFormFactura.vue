<template>
    <div class="row form-component">
        <div class="body-buscar row">
            <div class="body-filter row">
                <button class="btn blue" @click="buscarProducto(true)">buscar</button>
            </div>
            <div class="input-field col s6">
                <input id="codigo" type="number" min="1" class="validate" required v-model="codigo">
                <label for="codigo" translate="no">Ingresar el Codigo</label>
            </div>
        </div>
        <div class="body-resultados" v-if="this.resultado != null && !this.filtrar">
            <div class="body-table">
                <table class="striped">
                    <thead>
                        <tr class="blue cabecera-table">
                            <td>Codigo</td>
                            <td>Nombre</td>
                            <td>Precio de Compra</td>
                            <td>Precio de Venta</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> {{ resultado.id }}</td>
                            <td> {{ resultado.nombre }}</td>
                            <td> {{ resultado.precio_de_compra }}</td>
                            <td> {{ resultado.precio_de_venta }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="cantidad" type="number" min="1" class="validate" required v-model="cantProducto">
                    <label for="cantidad" translate="no">Ingresar la cantidad comprada</label>
                </div>
                <div class="row boton-agregar">
                    <button class="btn blue" @click="agregarProdCarrito()">Agregar</button>
                </div>
            </div>
        </div>
        <div class="body-resultados" v-else-if="this.filtrar">
            <h4>No se encontraron resultados con el codigo: {{ this.codigo }}</h4>
        </div>
        <div class="body-list-prod" v-if="this.productos != null">
            <div class="body-productos-carrito">
                <table class="striped">
                    <thead>
                        <tr class="blue cabecera-table">
                            <td>Codigo</td>
                            <td>Nombre</td>
                            <td>Precio de Compra</td>
                            <td>Precio de Venta</td>
                            <td>Cantidad</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of this.productos" :key="item.index">
                            <td class="centro"> {{ item.id }}</td>
                            <td> {{ item.nombre }}</td>
                            <td> {{ item.precio_de_compra }}</td>
                            <td> {{ item.precio_de_venta }}</td>
                            <td> Cantidad</td> <!--agregar este dato a la lista-->
                            <td> Total</td> <!--agregar este dato a la lista-->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="body-list-prod" v-else>No se agrego ningun producto</div>
        <div class="row body-cargar-atras">
            <button class="btn blue">Cargar Factura</button>
            <router-link :to="{ name: 'facturas' }" class="btn blue atras">Cancelar</router-link>
        </div>

    </div>
</template>
<script>
import axios from "axios";
import M from "materialize-css";

export default {
    name: 'ComponentFormFactura',
    data() {
        return {
            resultado: null,
            productos: null,
            filtrar: false,
            codigo: null,
            cantProducto: null
        }
    },
    mounted() {
        M.AutoInit();
    },
    methods: {
        buscarProducto(filtro) {
            this.filtro = filtro;
            axios.get("http://127.0.0.1:8000/producto/" + this.codigo).then((response) => {
                this.resultado = response.data;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error').response
            });
        },
        agregarProdCarrito() {

        }
    }
}
</script>
<style>
.form-component {
    margin: 0 70px 0 70px;
}

.body-cargar-atras {
    margin: 10px 0 0 0;
}

.body-buscar {
    text-align: right;
    margin-top: 2%;
}

.body-filter {
    margin-top: 15px;
}

.atras {
    margin-left: 5px;
}

.boton-agregar {
    margin: 15px 0 0 0;
}
</style>