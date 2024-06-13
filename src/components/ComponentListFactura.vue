<template>
    <div class="row body-facturas">
        <div class="row body-botones">
            <div class="botones"><router-link :to="{ name: 'cargarFactura' }" class="btn blue nueva">Nueva
                    Factura</router-link>
            </div>
            <div class="botones"><button class="btn blue ganacias">Ganancias de hoy</button>
            </div>
        </div>
        <div class="row body-lista" v-if="this.cantFacturas != 0">
            <table class="striped">
                <thead>
                    <tr class="blue">
                        <td colspan="5">Lista de Facturas</td>
                    </tr>
                    <tr class="blue">
                        <td>Codigo</td>
                        <td>Total</td>
                        <td>Cant. Productos</td>
                        <td>Fecha</td>
                        <td>Botones</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.lista" :key="item.index">
                        <td> {{ item.id }}</td>
                        <td>{{ item.total }}</td>
                        <td>0</td>
                        <td>{{ item.fecha }}</td>
                        <td><button class="">ver productos</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row mensajeVacio" v-else>
            <h1>No hay Facturas realizadas</h1>
        </div>
        <div class="body-atras">
            <div class="botones"><router-link :to="{ name: 'home' }" class="btn blue atras"> Atras</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import M from "materialize-css";
export default {
    name: "ComponentListFactura",
    data() {
        return {
            lista: [],
            cantFacturas: 0,
            page: 1,
        }
    },
    mounted() {
        M.AutoInit();
        this.obtenerDatos();
    },
    methods: {
        obtenerDatos() {
            axios.get("http://127.0.0.1:8000/factura/lista/" + this.page).then(res => this.lista = res.data).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
                    .then(() => {
                        window.location.href = "/"
                    })
            })
        }
    }

}
</script>
<style>
.body-botones {
    text-align: right;
    margin: 15px 0 0 0;
}

.body-facturas {
    margin: 0 70px 0 70px;
}

.botones {
    float: right;
    margin: 0 0 0 8px;
}
</style>