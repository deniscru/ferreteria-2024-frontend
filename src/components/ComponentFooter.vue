<template>
    <footer class="valign-wrapper home-img">
        <div class="container ">
        </div>

    </footer>
</template>

<script>
export default {
    name: 'ComponentFooter',
    setup() {

    },
}
</script>
<style scoped>
footer {
    background-color: #009688;
    color: white;
    font-weight: bold;
    text-align: center;
}

.container {
    display: flex;
    justify-content: center;
    text-align: center;

}

.home-img {
    width: 100%;
    height: 100px;
    background-image: url('../assets/ferreteria.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
</style>