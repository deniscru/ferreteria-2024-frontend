<template>
    <div class="row body-form">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input id="nombre_prod" type="text" class="validate">
                    <label for="nombre_prod">Nombre</label>
                </div>
                <div class="input-field col s6">
                    <input id="nom_alias_prod" type="text" class="validate">
                    <label for="nom_alias_prod">Nombre alias</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="descripcion" class="materialize-textarea"></textarea>
                    <label for="descripcion">Descripcion</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="precio_de_venta" type="text" class="validate">
                    <label for="precio_de_venta">Precio de Venta</label>
                </div>
                <div class="input-field col s6">
                    <input id="precio_de_compra" type="text" class="validate">
                    <label for="precio_de_compra">Precio de Compra</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="medida" type="text" class="validate">
                    <label for="medida">Medida</label>
                </div>
                <div class="input-field col s6">
                    <input id="cantidad" type="number" min="1" class="validate">
                    <label for="cantidad">Cantidad</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select name="select">
                        <option value=" " disabled selected>Seleccionar opcion</option>
                        <option value="1">Electricidad</option>
                        <option value="2">Plomeria</option>
                        <option value="3">Ferreteria</option>
                        <option value="4">Limpieza</option>
                    </select>
                    <label>Tipo</label>
                </div>
            </div>
            <div class="file-field input-field">
                <div class="btn">
                    <span>Imagen</span>
                    <input type="file" multiple>
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" placeholder="Eligir la imagen a cargar">
                </div>
            </div>
            <div class="input-field col s6">
                <label>Tipo</label>

                <select name="select" class="select">
                    <option value=" " disabled selected>Seleccionar opcion</option>
                    <option value="1">Electricidad</option>
                    <option value="2">Plomeria</option>
                    <option value="3">Ferreteria</option>
                    <option value="4">Limpieza</option>
                </select>
            </div>
        </form>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "ComponentForm",
    data() {
        return {
            lista: []
        }
    },
    mounted() {
        this.obtenerDatos();

    },
    methods: {
        obtenerDatos() {
            axios.get("http://127.0.0.1:8000/tipo/lista").then((response) => {
                this.lista = response.data.items;
                console.log(this.lista)
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
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