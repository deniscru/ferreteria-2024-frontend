<template>
    <div class="row body-form">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input id="nombre_prod" type="text" class="validate" v-model="prod.nombre" required>
                    <label for="nombre_prod">Nombre</label>
                </div>
                <div class="input-field col s6">
                    <input id="nom_alias_prod" type="text" class="validate" v-model="prod.nombre_alias" required>
                    <label for="nom_alias_prod">Nombre alias</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="descripcion" class="materialize-textarea" v-model="prod.descrip"></textarea>
                    <label for="descripcion">Descripcion</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="precio_de_venta" type="number" min="1" class="validate" required v-model="prod.precio_venta">
                    <label for="precio_de_venta">Precio de Venta</label>
                </div>
                <div class="input-field col s6">
                    <input id="precio_de_compra" type="number" min="1" class="validate" required
                        v-model="prod.precio_compra">
                    <label for="precio_de_compra">Precio de Compra</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="medida" type="number" class="validate" required v-model="prod.medida">
                    <label for="medida">Medida</label>
                </div>
                <div class="input-field col s6">
                    <input id="cantidad" type="number" min="1" class="validate" required v-model="prod.cant">
                    <label for="cantidad">Cantidad</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select name="select" v-model="prod.tipo" required>
                        <option value="" disabled selected>Seleccionar</option>
                        <option value="1">Electricidad</option>
                        <option value="2">Plomeria</option>
                        <option value="3">Ferreteria</option>
                        <option value="4">Limpieza</option>
                    </select>
                    <label>Tipo</label>
                </div>
            </div>
            <div class="row"><button class="btn green" @click="guardar">Guardar</button></div>
        </form>
    </div>
</template>

<script>

import axios from 'axios';
import M from 'materialize-css';

export default {
    name: "ComponentForm",
    data() {
        return {
            lista: [],
            prod: {
                nombre: "",
                nombre_alias: "",
                descrip: "",
                precio_venta: "",
                precio_compra: "",
                medida: "",
                cant: "",
                tipo: "",
            },
        }
    },
    mounted() {
        M.AutoInit();
    },
    methods: {
        obtenerDatos() {
            axios.get("http://127.0.0.1:8000/tipo/lista").then((response) => {
                this.lista = response.data.items;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
            });

        },
        guardar() {
            axios.post(
                "http://127.0.0.1:8000/producto/alta",
                {
                    "nombre": this.prod.nombre,
                    "nombre_alias": this.prod.nombre_alias,
                    "descripcion": this.prod.descrip,
                    "medida": this.prod.medida,
                    "precio_de_compra": this.prod.precio_compra,
                    "precio_de_venta": this.prod.precio_venta,
                    "cant": this.prod.cant,
                    "tipo_id": this.prod.tipo
                }
            ).then(() => {
                window.alert("El Producto se cargo correctamente");
                window.location.href = "/nuevoProducto";
            }).catch((error) => {
                this.$swal('Falló el envío de solicitud', error.response.data.error, 'error');
            });

        }
    }

}
</script>

<style>
.body-form {
    margin-left: 7%;
    margin-right: 7%;
}

.select {
    width: 100%;
}
</style>