<template>
  <div class="mx-5 mt-3">
      <h1>Register</h1>
        <form @submit.prevent="handleRegister" class="mt-3">
            <div class="form-group mt-3">
                <label for="username">Username</label>
                <input type="text" name="username" v-model="registerForm.username" class="form-control">
            </div>
            <div class="form-group mt-3">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="registerForm.email" class="form-control">
            </div>
            <div class="form-group mt-3">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="registerForm.password" class="form-control">
            </div>
            <div class="form-group mt-3">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" v-model="registerForm.confirmPassword" class="form-control">
            </div>
            <div class="alert alert-success mt-3" role="alert" v-if="isSuccess">{{ isSuccess }}</div>
            <div class="alert alert-danger mt-3" role="alert" v-else-if="isError">{{ isError }}</div>
            <button type="submit" class="form-control btn btn-primary mt-3">Register</button>
        </form>
  </div>
</template>

<script>
import axiosApiIntances from '../../utils/axios'

export default {
    name : 'Register',
    data() {
        return {
            registerForm: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            isSuccess: false,
            isError: false
        }
    },
    methods: {
        handleRegister() {
            const data = {
                userName: this.registerForm.username,
                userEmail: this.registerForm.email,
                userPassword: this.registerForm.password
            }
            if(this.registerForm.username === '' && this.registerForm.email === '' && this.registerForm.password === '' && this.registerForm.confirmPassword === '') {
                this.isError = 'All form is empty. Please fill all this form now!'
            } else if(this.registerForm.username === '') {
                this.isError = 'The username form is empty! Please fill a username form below!'
            } else if(this.registerForm.email === '') {
                this.isError = 'The email form is empty! Please fill a email form below!'
            } else if(this.registerForm.password === '') {
                this.isError = 'The password form is empty! Please fill a password form below!'
            } else if(this.registerForm.confirmPassword === '') {
                this.isError = 'The confirm password form is empty! Please fill a confirm password form below!'
            } else if(this.registerForm.password !== this.registerForm.confirmPassword) {
                this.isError = 'A password and confirm password is not match. Please make sure your password and confirm password is matched!'
            } else {
                axiosApiIntances.post('auth/register', data)
                .then((res) => {
                    this.isSuccess = res.data.msg
                    this.$router.push({ path: "/login" })
                })
                .catch((err) => {
                    console.log(err.response)
                    this.isError = err.response.data.msg
                })
            }
        }
    }
}
</script>

<style>

</style>