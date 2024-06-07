<template>
    <div class="row body-form">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <input id="nombre_prod" type="text" v-model="prod.nombre" class="validate">
                    <label v-if="prod.nombre == ''" for="nombre_prod">Nombre</label>
                </div>
                <div class="input-field col s6">
                    <input id="cantidad" type="number" min="1" class="validate" v-model="prod.cant">
                    <label v-if="prod.cant == ''" for="cantidad">Cantidad</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="precio_de_venta" type="text" class="validate" v-model="prod.precio_de_venta">
                    <label v-if="prod.precio_de_venta == ''" for="precio_de_venta">Precio de Venta</label>
                </div>
                <div class="input-field col s6">
                    <input id="precio_de_compra" type="text" class="validate" v-model="prod.precio_de_compra">
                    <label v-if="prod.precio_de_compra == ''" for="precio_de_compra">Precio de Compra</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <textarea id="descripcion" class="materialize-textarea" v-model="prod.descripcion"></textarea>
                    <label v-if="prod.descripcion == ''" for="descripcion">Descripcion</label>
                </div>
                <div class="input-field col s6">
                    <select name="select" class="selector" v-model="prod.tipo_id">
                        <option value="" disabled selected>Seleccionar</option>
                        <option value="1">Electricidad</option>
                        <option value="2">Plomeria</option>
                        <option value="3">Ferreteria</option>
                        <option value="4">Limpieza</option>
                    </select>
                    <label>Tipo</label>
                </div>
            </div>
            <div class="row">
                <button class="btn green" @click="editar">Editar</button>
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
            prod: {
                nombre: "",
                descrip: "",
                precio_de_venta: null,
                precio_de_compra: null,
                cant: null,
                tipo_id: null,
            },
            id: null,
        }
    },
    mounted() {
        M.AutoInit();
        if (this.$route.params.id != undefined)
            // carga editar
            this.id = this.$route.params.id;
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
        editar() {
            //Error 422
            var datos = {
                "nombre": this.prod.nombre,
                "descripcion": this.prod.descripcion,
                "precio_de_compra": this.prod.precio_de_compra,
                "precio_de_venta": this.prod.precio_de_venta,
                "cant": this.prod.cant,
                "tipo_id": this.prod.tipo_id,
            };
            console.log(datos);
            if (window.confirm("seguro que desea editar?")) {

                axios.post("http://127.0.0.1:8000/producto/actualizar/data/campos/" + this.id,
                    datos).then(() => {
                        window.alert("El Producto se Edito correctamente");
                        location.reload();
                    }).catch((error) => {
                        this.$swal('Falló el envío de solicitud', error.response.data.error, 'error');
                    })
            }
        },
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