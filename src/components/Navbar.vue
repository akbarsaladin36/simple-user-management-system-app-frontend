<template>
  <!-- if user is authenticated -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isAuthenticated">
    <div class="container">
        <router-link class="navbar-brand" to="/home">SUMS</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <button class="btn btn primary" @click="handleProfile">Profile</button>
                </li>
                <li class="nav-item">
                    <button class="btn btn primary" @click="handleLogout">Logout</button>
                </li>
            </ul>
        </div>
    </div>
 </nav>

 <!-- if user is not authenticated -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-else>
    <div class="container">
        <router-link class="navbar-brand" to="/">SUMS</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
            </li>
        </ul>
        </div>
    </div>
 </nav>
</template>

<script>
const user_id = localStorage.getItem('user_id')

export default {
    name: 'Navbar',
    data() {
        return {
            isAuthenticated: localStorage.getItem("token")
        }
    },
    methods: {
        handleLogout() {
            localStorage.clear()
            this.$router.push({ path: "/login" })
        },
        handleProfile() {
            const id = user_id
            this.$router.push({ name: "Profile", params: { id }})
        }
    }
}
</script>

<style>

</style>