<template>
    <div class="container">
        <div class="row">
            <div class="col-6 mt-5 offset-3">
                <div class="card">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <ul v-for="error in errors" :key="error">
                            <li class="text-danger">{{ error }}</li>
                        </ul>
                        <form @submit.prevent="login">
                            <div class="mb-3">
                                <label class="form-label">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Enter your Email"
                                    v-model="email"
                                />
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Enter your password"
                                    v-model="password"
                                />
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            errors: [],
        };
    },
    methods: {
        login() {
            this.clearMessage();

            // Api
            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("api/login", {
                        email: this.email,
                        password: this.password,
                    })
                    .then((result) => {
                        console.log(result.data.token);
                        const status = true;
                        const token = result.data.token;
                        this.$store.dispatch("setAuthToken", token);

                        this.$store.dispatch("setAuthStatus", status);

                        //
                        this.$router.push({
                            name: "dashboard",
                        });

                        if (result.status == 201) {
                            console.log(result.data.message);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        // if (error.response.status == 422) {
                        //     this.errors = Object.values(
                        //         error.response.data.errors
                        //     ).flat();
                        // } else {
                        //     this.errors = "Something went wrong";
                        // }
                    });
            });
        },
        clearMessage() {
            this.errors = "";
        },
    },
};
</script>
