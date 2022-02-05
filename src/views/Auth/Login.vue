<template>
  <div class="mx-5 mt-5">
      <h1>Login</h1>
        <form @submit.prevent="handleLogin" class="mt-3">
            <div class="form-group mt-3">
                <label for="email">Email</label>
                <input type="email" name="email" v-model="loginForm.email" class="form-control">
            </div>
            <div class="form-group mt-3">
                <label for="password">Password</label>
                <input type="password" name="password"  v-model="loginForm.password" class="form-control">
            </div>
            <div class="alert alert-success mt-3" role="alert" v-if="isSuccess">{{ isSuccess }}</div>
            <div class="alert alert-danger mt-3" role="alert" v-else-if="isError">{{ isError }}</div>
            <button type="submit" class="form-control btn btn-primary mt-3">Login</button>
        </form>
  </div>
</template>

<script>
import axiosApiIntances from '../../utils/axios'
export default {
    name : 'Login',
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            isSuccess: false,
            isError: false
        }
    },
    methods: {
        handleLogin(){
            const data = {
                userEmail: this.loginForm.email,
                userPassword: this.loginForm.password
            }
            if(this.loginForm.email === '' && this.loginForm.password === '') {
                this.isError = 'Your email and password is empty! Please fill them below!'
            } else if (this.loginForm.email === '') {
                this.isError = 'Your email is empty! Please fill this form below!'
            } else if (this.loginForm.password === '') {
                this.isError = 'Your password is empty! Please fill this form below!'
            } else {
                axiosApiIntances.post('http://localhost:3009/backend9/api/v1/auth/login', data)
                .then((res) => {
                    // console.log(res)
                    this.isSuccess = res.data.msg
                    localStorage.setItem('token', res.data.data.token)
                    localStorage.setItem('user_id', res.data.data.user_id)
                    setTimeout(() => {
                        this.$router.push({ path: "/home" })
                    },3000)
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