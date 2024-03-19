<template>
    <div class="container">
        <div class="row">
            <div class="col-6 mt-5 offset-3">
                <div class="card">
                    <div class="card-header">Register</div>
                    <div class="card-body">
                        <ul v-for="error in errors" :key="error">
                            <li class="text-danger">{{ error }}</li>
                        </ul>
                        <div
                            v-show="successMsg"
                            class="alert alert-success"
                            role="alert"
                        >
                            {{ successMsg }}
                        </div>
                        <form @submit.prevent="register">
                            <div class="mb-3">
                                <label class="form-label">Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter your name"
                                    v-model="name"
                                />
                            </div>
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
                            <div class="mb-3">
                                <label class="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Enter your confirm password"
                                    v-model="confirmed_password"
                                />
                            </div>
                            <div class="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                />
                                <label class="form-check-label">
                                    Check me out
                                </label>
                            </div>
                            <button type="submit" class="btn btn-primary">
                                Register
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
            name: "",
            email: "",
            password: "",
            confirmed_password: "",
            errors: [],
            successMsg: "",
        };
    },
    methods: {
        register() {
            this.clearMessage();
            if (this.password != this.confirmed_password) {
                this.errors = [
                    "Your Password does not match with confirmed password",
                ];
                return;
            }

            // Api
            axios
                .post("api/register", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                .then((result) => {
                    console.log(result);
                    if (result.status == 201) {
                        this.successMsg = result.data.message;
                    }
                })
                .catch((err) => {
                    if (err.response.status == 422) {
                        this.errors = Object.values(
                            err.response.data.errors
                        ).flat();
                    } else {
                        this.errors = "Something went wrong";
                    }
                });
        },
        clearMessage() {
            this.errors = "";
        },
    },
};
</script>
