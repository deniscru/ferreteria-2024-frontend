<template>
    <div class="body-list-title margen">
        <div class="body-boton row">
            <div class="body-filter">
                <button class="btn blue" @click="obtenerDatos(true)">filtrar</button>
            </div>
            <div class="col s6 body-select">
                <select name="select" v-model="tipo">
                    <option value=" " disabled selected>Seleccionar</option>
                    <option value="1">Electricidad</option>
                    <option value="2">Plomeria</option>
                    <option value="3">Ferreteria</option>
                    <option value="4">Limpieza</option>
                </select>
            </div>
            <div class="input-field col s4">
                <input id="porcentaje" type="number" min="1" class="validate" required v-model="cant">
                <label for="porcentaje">Ingrese Porcentaje</label>
            </div>
            <div class="body-limpiar">
                <button class="btn blue" @click="obtenerDatos(false)" v-if="filtro">Limpiar</button>
            </div>
        </div>
        <div class="tabla">
            <table class="striped">
                <thead>
                    <tr class="blue cabecera-table">
                        <td>Nombre</td>
                        <td>Codigo</td>
                        <td>Precio de Venta</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.lista" :key="item.index">
                        <td>
                            <label>
                                <input type="checkbox" id={{item.id}} />
                                <span>{{ item.nombre }}</span>
                            </label>
                        </td>
                        <td> {{ item.id }}</td>
                        <td> {{ item.precio_de_compra }}</td>

                    </tr>
                </tbody>
            </table>
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
                direccion = "http://127.0.0.1:8000/producto/lista/precios";
            } else {
                direccion = "http://127.0.0.1:8000/producto/lista/precios";
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

        }
    }
}


</script>
<style></style>