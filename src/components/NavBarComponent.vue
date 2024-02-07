<template>
    <div>
        <div class="nav-body-title">
            <nav class="nav">
                <div class="nav-wrapper">
                    <ul class="left hide-on-med-and-down">
                        <li><button class="boton_1" v-on:click="this.recargar"><router-link
                                    :class="[{ 'active': this.currentRouteName() === '/prodList/3' }]"
                                    :to="{ name: 'prodLista', params: { id: '3' } }"><a>Ferreteria
                                    </a></router-link></button>
                        </li>
                        <li><button class="boton_2" v-on:click="this.recargar"><router-link
                                    :class="[{ 'active': this.currentRouteName() === '/prodList/2' }]"
                                    :to="{ name: 'prodLista', params: { id: '2' } }">Plomeria</router-link>
                            </button>
                        </li>
                        <li><button class="boton_3" v-on:click="this.recargar"><router-link
                                    :class="[{ 'active': this.currentRouteName() === '/prodList/1' }]"
                                    :to="{ name: 'prodLista', params: { id: '1' } }">Electricidad</router-link>
                            </button>
                        </li>
                        <li> <button class="boton_4" v-on:click="this.recargar"><router-link
                                    :class="[{ 'active': this.currentRouteName() === '/prodList/4' }]"
                                    :to="{ name: 'prodLista', params: { id: '4' } }">Limpieza</router-link>
                            </button>
                        </li>

                    </ul>

                </div>
            </nav>
        </div>
    </div>
</template>

<script>

export default {
    name: "NavBarComponent",
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        currentRouteName() {
            return window.location.pathname;
        },
        recargar() {
            location.reload();
        }

    }

}
</script>
