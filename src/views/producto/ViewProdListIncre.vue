<template>
    <div class="body-list-produc">
        <div class="body-title-incre">
            <h1>Incrementar</h1>
        </div>
        <ComponentListIncre />
    </div>
</template>
<script>
import ComponentListIncre from '@/components/ComponentListIncre.vue';

export default {
    name: 'viewProdListIncre',
    components: {
        ComponentListIncre
    },
    mounted() {

    },

    data() {
        return {
        };
    },
    methods: {

    }
}
</script>