<template>
    <div class="row">
        <nav class="nav-extended blue">
            <div class="nav-wrapper">
                <img src="../assets/ferreteria.png" width="100%" height="90px" />
            </div>
            <div class="nav-content">
                <ul class="tabs tabs-transparent margen-izq">
                    <li class="tab">
                        <router-link :class="[{ 'active': this.currentRouteName() === '/lista/0' }]"
                            :to="{ name: 'lista', params: { tipo: '0', } }">Todos</router-link>
                    </li>
                    <li class="tab">
                        <router-link :class="[{ 'active': this.currentRouteName() === '/lista1/3' }]"
                            :to="{ name: 'lista1', params: { tipo: '3', } }">Ferreteria</router-link>
                    </li>
                    <li class="tab">
                        <router-link :class="[{ 'active': this.currentRouteName() === '/lista2/2' }]"
                            :to="{ name: 'lista2', params: { tipo: '2', } }">Plomeria</router-link>
                    </li>
                    <li class="tab">
                        <router-link :class="[{ 'active': this.currentRouteName() === '/lista3/1' }]"
                            :to="{ name: 'lista3', params: { tipo: '1', } }">Electricidad</router-link>
                    </li>
                    <li class="tab">
                        <router-link :class="[{ 'active': this.currentRouteName() === '/lista4/4' }]"
                            :to="{ name: 'lista4', params: { tipo: '4' } }">Limpieza</router-link>
                    </li>
                    <li class="tab"><router-link :class="[{ 'active': this.currentRouteName() === '/nuevoProducto' }]"
                            :to="{ name: 'nuevoProducto' }">Nuevo
                            Producto</router-link></li>
                    <li class="tab"><router-link :class="[{ 'active': this.currentRouteName() === '/facturas' }]"
                            :to="{ name: 'facturas' }">Facturas</router-link></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import M from 'materialize-css';

export default {
    name: "NavBarComponent",
    data() {
        return {
        }
    },
    mounted() {
        M.AutoInit();
    },

    methods: {
        currentRouteName() {
            return window.location.pathname;
        },

    }

}
</script>

<style>
.margen-izq {
    margin: 0 0 0 40px;
}

.margen-der {
    margin: 0 40px 0 0;
}
</style>