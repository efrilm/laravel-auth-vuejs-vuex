<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-5">
                <div class="card">
                    <div class="card-header">Dashboard</div>
                    <div class="card-body">
                        <p class="card-text">Your are logged in!.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            user: Object,
        };
    },
    mounted() {
        // this.getUserDetails();
    },
    method: {
        getUserDetails() {
            axios
                .get("api/users")
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {});
        },
    },
};
</script>

<style></style>
