<template>
    <div class="row body-facturas">
        <div class="row body-botones">
            <div class="row botones">
                <button class="btn blue" @click="ventasHoy">Ventas de Hoy</button>
            </div>
            <div class="row botones">
                <router-link :to="{ name: 'cargarFactura' }" class="btn blue nueva">Nueva
                    Factura</router-link>
            </div>
        </div>
        <div class="row body-lista" v-if="this.listFacturas">
            <table>
                <thead>
                    <tr class="blue cabecera">
                        <td colspan="5">LISTA DE FACTURAS</td>
                    </tr>
                    <tr class="blue cabecera">
                        <td>CODIGO</td>
                        <td>TOTAL</td>
                        <td>FECHA</td>
                        <td colspan="2">BOTONES</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of this.lista" :key="item.index">
                        <td class="centro"> {{ item.id }}</td>
                        <td>{{ item.total }}</td>
                        <td>{{ item.fecha_y_hora }}</td>
                        <td class="centro"><button class="btn blue" @click="productosFactura(item.id)">ver
                                productos</button></td>
                        <td class="centro"><button class="btn red" @click="eliminar(item.id)">Eliminar</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row mensajeVacio" v-else>
            <h1>{{ this.mensaje }}</h1>
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
            listFacturas: false,
            page: 1,
            mensaje: "No hay Facturas realizadas",
        }
    },
    mounted() {
        M.AutoInit();
        this.obtenerDatos();

    },
    methods: {
        obtenerDatos() {
            axios.get("http://127.0.0.1:8000/factura/lista/" + this.page).then((response) => {
                this.lista = response.data.items;
                console.log(this.lista)
                if (this.lista.length > 0) {
                    this.listFacturas = true;
                } else {
                    this.listFacturas = false;
                }
            }).catch((error) => {
                this.$swal('Error', error.response.data.error, 'error')
                    .then(() => {
                        window.location.href = "/"
                    })
            })

        },
        eliminar(id) {
            this.$swal.fire({
                title: "¿Seguro que desea eliminar?",
                showDenyButton: true,
                confirmButtonText: "Aceptar",
                denyButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(
                        "http://127.0.0.1:8000/factura/eliminar/" + id
                    ).then((response) => {
                        this.$swal({
                            title: response.data.mensaje,
                            icon: "success",
                        });
                        this.obtenerDatos();
                    }).catch((error) => {
                        this.$swal('Error', error.response.data.error, 'error')
                    })
                }
            })
        },
        productosFactura(idF) {
            localStorage.setItem("idFactura", idF);
            this.$router.push({ name: 'facturaProductos' });
        },
        ventasHoy() {
            axios.get("http://127.0.0.1:8000/factura/lista/venta/hoy").then((response) => {
                this.lista = response.data.items;
                if (this.lista.length > 0) {
                    this.listFacturas = true;
                } else {
                    this.mensaje = "No hay facturas realizadas del dia de hoy!"
                    this.listFacturas = false;
                }
            }).catch((error) => {
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
    margin: 15px 0 15px 0;
}

.body-facturas {
    margin: 0 70px 0 70px;
}

.botones {
    float: right;
    margin: 0 0 0 8px;
}

.centro {
    text-align: center;
}

.cabecera td {
    text-align: center;
    color: black
}
</style>