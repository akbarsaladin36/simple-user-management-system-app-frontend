<template>
  <div class="mx-5 mt-5">
      <h1>Profile</h1>
      <button class="btn btn-primary mt-3" @click="getToEditProfile">Edit Profile</button>
      <div class="row mt-5">
          <div class="col">
              <h5>First Name</h5>
              <p>{{ userDetail.user_first_name }}</p>
          </div>
          <div class="col">
              <h5>Last Name</h5>
              <p>{{ userDetail.user_last_name }}</p>
          </div>
      </div>
      <div class="row mt-5">
          <div class="col">
              <h5>Address</h5>
              <p>{{ userDetail.user_address}}</p>
          </div>
          <div class="col">
              <h5>Phone Number</h5>
              <p>{{ userDetail.user_phone_number }}</p>
          </div>
      </div>
  </div>
</template>

<script>
import axiosApiIntances from "../../utils/axios"

export default {
    name: 'Profile',
    data() {
        return {
            userDetail: '',
            isEditProfile: false
        }
    },
    methods: {
        getProfileDetail() {
            axiosApiIntances.get(`users/${this.$route.params.id}`)
            .then((res) => {
                console.log(res)
                this.userDetail = res.data.data[0]
            })
            .catch((err) => {
                console.log(err.response)
            })
        },
        getToEditProfile() {
            this.$router.push({ name: "EditProfile", params: this.$route.params.id })
        }
    },
    created() {
        this.getProfileDetail()
    }
}

</script>

<style>

</style>