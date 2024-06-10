<template>
    <div class="body-list-title margen">
        <div class="body-boton row">
            <div class="body-filter row">
                <button class="btn blue" @click="obtenerDatos(true)">filtrar</button>
            </div>
            <div class=" input-field col s3 body-select">
                <select name="select" v-model="tipo">
                    <option value="" disabled selected>Seleccionar</option>
                    <option value="1">Electricidad</option>
                    <option value="2">Plomeria</option>
                    <option value="3">Ferreteria</option>
                    <option value="4">Limpieza</option>
                </select>
            </div>
            <div class="input-field col s6">
                <input id="porcentaje" type="number" min="1" max="100" class="validate" required v-model="cant">
                <label for="porcentaje" translate="no">Ingresar el porcentaje</label>
            </div>
            <div class="body-limpiar">
                <button class="btn blue" @click="obtenerDatos(false)" v-if="filtro">Limpiar</button>
            </div>
        </div>
        <div class="tabla">
            <table class="striped">
                <thead>
                    <tr class="blue cabecera-table">
                        <td id="nombre">Nombre</td>
                        <td>Codigo</td>
                        <td>Precio de Compra</td>
                        <td>Precio de Venta</td>
                        <td>fecha actualizada</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.lista" :key="item.index">
                        <td>
                            <label class="label-nombre">
                                <input type="checkbox" v-bind:id="'input' + item.id" value="1" />
                                <span class="nombre">
                                    {{ item.nombre.toUpperCase() }}
                                </span>
                            </label>
                        </td>
                        <td translate="no"> {{ item.id }}</td>
                        <td> {{ item.precio_de_compra }}</td>
                        <td> {{ item.precio_de_venta }}</td>
                        <td>{{ item.date }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="row body-bot-incre">
                <button class="btn blue" @click="incrementar">Incrementar</button>
                <router-link :to="{ name: 'home' }" class="btn blue atras">Atras</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import M from 'materialize-css';

export default {
    name: 'ComponentListIncre',
    data() {
        return {
            lista: [],
            tipo: "",
            filtro: false,
            cant: "",
        }
    },
    mounted() {
        M.AutoInit();
        this.obtenerDatos(false)
    },
    methods: {
        obtenerDatos(filtro) {
            var direccion = "";
            if (filtro && this.tipo != "") {
                direccion = "http://127.0.0.1:8000/producto/lista/preciosTipo/" + this.tipo;
                this.filtro = true;
            } else if (filtro && this.tipo == "") {
                this.$swal('Advertencia', " Debe seleccionar un tipo", 'error');
                direccion = "http://127.0.0.1:8000/producto/lista/precios/todos/increm";
            } else {
                direccion = "http://127.0.0.1:8000/producto/lista/precios/todos/increm";
                this.filtro = false;
                this.tipo = "";
            }
            console.log(direccion);
            axios.get(direccion).then((response) => {
                this.lista = response.data.items;
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
            });
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
                    console.log(response);
                    location.reload();
                }).catch((error) => { this.$swal("Error", error.response.data.error, "error") })
            } else {
                window.alert("Debe ingresar el porcentaje");
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
.body-bot-incre {
    margin: 2% 0 0 0;
}

.atras {
    margin: 0 0 0 2%;
}

.nombre {
    font-style: italic;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: x-small;
    color: black;
}

.label-nombre {
    margin: 0 0 0 15px;
}

.cabecera-table td {
    text-transform: uppercase;
}

.body-boton {
    text-align: right;
    margin-top: 2%;
}
</style>