<template>
    <div class="row body-form">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input id="nombre_prod" type="text" v-model="prod.nombre" class="validate">
                    <label for="nombre_prod">Nombre</label>
                </div>
                <div class="input-field col s6">
                    <input id="cantidad" type="number" min="1" class="validate" v-model="prod.cantidad">
                    <label for="cantidad">Cantidad</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="precio_de_venta" type="text" class="validate" v-model="prod.precio_de_venta">
                    <label for="precio_de_venta">Precio de Venta</label>
                </div>
                <div class="input-field col s6">
                    <input id="precio_de_compra" type="text" class="validate" v-model="prod.precio_de_compra">
                    <label for="precio_de_compra">Precio de Compra</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <textarea id="descripcion" class="materialize-textarea" v-model="prod.descripcion"></textarea>
                    <label for="descripcion">Descripcion</label>
                </div>
                <div class="input-field col s6">
                    <select name="select">
                        <option value=" " disabled selected>Seleccionar</option>
                        <option value="1">Electricidad</option>
                        <option value="2">Plomeria</option>
                        <option value="3">Ferreteria</option>
                        <option value="4">Limpieza</option>
                    </select>
                    <label>Tipo</label>
                </div>
            </div>
            <div class="row">
                <button class="btn green" @click="guardar">Guardar</button>
                <router-link :to="{ name: 'home' }" class="btn blue atras">Atras</router-link>
            </div>
        </form>
    </div>
</template>

<script>

import axios from 'axios';
import M from 'materialize-css';

export default {
    name: "ComponentFormEdit",
    data() {
        return {
            lista: [],
            prod: []
        }
    },
    mounted() {
        M.AutoInit();
        if (this.$route.params.id != undefined)
            // carga editar
            axios.get("http://127.0.0.1:8000/producto/" + this.$route.params.id)
                .then(res => this.prod = res.data)
                .catch((error) => {
                    this.$swal('Error', error.response.data.error, 'error')
                        .then(() => {
                            window.location.href = "/"
                        })
                })

    },
    methods: {
        obtenerDatos() {
            axios.get("http://127.0.0.1:8000/tipo/lista").then((response) => {
                this.lista = response.data.items;
                console.log(this.lista)
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
            });

        },
        guardar() {

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

.atras {
    margin-left: 5px;
}
</style>