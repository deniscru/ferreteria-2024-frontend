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
                    <button class="btn blue" @click="addProducto">Agregar</button>
                </div>
            </div>
        </div>
        <div class="body-resultados" v-else-if="this.filtrar">
            <h4>No se encontraron resultados con el codigo: {{ this.codigo }}</h4>
        </div>
        <div class="body-list-prod" v-if="this.productos.length != 0">
            <div class="body-productos-carrito">
                <table class="striped">
                    <thead>
                        <tr class="blue cabecera-table">
                            <td colspan="7"> Lista de Productos</td>
                        </tr>
                        <tr class="blue cabecera-table">
                            <td>Codigo</td>
                            <td>Nombre</td>
                            <td>Precio de Compra</td>
                            <td>Precio de Venta</td>
                            <td>Cantidad</td>
                            <td>Total</td>
                            <td>Boton</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of this.productos" :key="item.index">
                            <td class="centro"> {{ item.id }}</td>
                            <td> {{ item.nombre }}</td>
                            <td> {{ item.precio_de_compra }}</td>
                            <td> {{ item.precio_de_venta }}</td>
                            <td> {{ item.cantProducto }}</td> <!--agregar este dato a la lista-->
                            <td> {{ item.precio_de_venta * item.cantProducto }}</td> <!--agregar este dato a la lista-->
                            <td> <button class="btn red" @click="removeProducto(item.index)">Quitar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="body-list-prod" v-else>
            <hr>
            <h4>No se agrego ningun producto</h4>
            <hr>
        </div>
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
            productos: [],
            datos: null,
            filtrar: false,
            codigo: null,
            cantProducto: null,
        }
    },
    mounted() {
        M.AutoInit();
        if (localStorage.getItem('productos')) {
            try {
                this.productos = JSON.parse(localStorage.getItem('productos'));
            } catch (e) {
                localStorage.removeItem('productos');
            }
        }
    },
    methods: {
        buscarProducto(filtro) {
            // obtenemos el producto que queremos agregar a la factura
            this.filtro = filtro;
            axios.get("http://127.0.0.1:8000/producto/" + this.codigo).then((response) => {
                this.resultado = response.data;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error').response
            });
        },
        addProducto() {
            // asegurarse que el usuario efectivamente ha escrito algo
            if (this.resultado == null) {
                return;
            }
            if (this.cantProducto == null) {
                window.alert("Debe ingresar una cantidad");
                return;
            }
            var encontro = false;
            for (var prod of this.productos) {
                if (prod.id == this.resultado.id) {
                    prod.cantProducto = prod.cantProducto + this.cantProducto;
                    encontro = true;
                }
            }
            if (!encontro) {
                this.resultado["cantProducto"] = this.cantProducto;
                this.productos.push(this.resultado);
            }
            this.resultado = null;
            this.cantProducto = null;
            this.filtrar = false;
            this.saveProducto();
        },
        removeProducto(x) {
            this.productos.splice(x, 1);
            this.saveProducto();
        },
        saveProducto() {
            const parsed = JSON.stringify(this.productos);
            localStorage.setItem('productos', parsed);
        },
        addFactura() {
            //Controlar la escructura de datos al enviarlo por la api
            // cantProductos se debe pasar de una manera diferente
            axios.post("http://127.0.0.1:8000/factura/altaFactura", this.productos).then(() => { window.alert("La factura se cargo correctamente!"); }).catch((error) => {
                this.$swal('Falló el envío de solicitud', error.response.data.error, 'error');
            })

        }
    }
}
</script>
<style>
.form-component {
    margin: 0 70px 0 70px;
}

.body-cargar-atras {
    margin: 10px 0 15px 0;
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