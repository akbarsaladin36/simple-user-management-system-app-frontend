<template>
  <div class="mx-5 mt-5">
      <h1>Edit Profile</h1>
      <form @submit.prevent="handleUpdateProfile">
        <button type="submit" class="btn btn-success mt-3">Update Profile</button>
        <div class="row mt-5">
            <div class="col">
                <h5>First Name</h5>
                <input type="text" name="first_name" id="first_name" v-model="profileForm.first_name" class="form-control">
            </div>
            <div class="col">
                <h5>Last Name</h5>
                <input type="text" name="last_name" id="last_name" v-model="profileForm.last_name" class="form-control">
            </div>
        </div>
        <div class="row mt-5">
            <div class="col">
                <h5>Address</h5>
                <input type="text" name="address" id="address" v-model="profileForm.address" class="form-control">
            </div>
            <div class="col">
                <h5>Phone Number</h5>
                <input type="text" name="phone_number" id="phone_number" v-model="profileForm.phone_number" class="form-control">
            </div>
        </div>
      </form>
  </div>
</template>

<script>
import axiosApiIntances from "../../utils/axios"

export default {
    name: 'EditProfile',
    data() {
        return {
            profileForm: {
                first_name: '',
                last_name: '',
                address: '',
                phone_number: ''
            },
            isSuccess: false,
            isError: false
        }
    },
    methods: {
        getProfileDetail() {
            axiosApiIntances.get(`users/${this.$route.params.id}`)
            .then((res) => {
                console.log(res)
                this.profileForm.first_name = res.data.data[0].user_first_name
                this.profileForm.last_name = res.data.data[0].user_last_name
                this.profileForm.address = res.data.data[0].user_address
                this.profileForm.phone_number = res.data.data[0].user_phone_number
            })
            .catch((err) => {
                console.log(err.response)
            })
        },
        handleUpdateProfile() {
            const data = {
                userFirstName: this.profileForm.first_name,
                userLastName: this.profileForm.last_name,
                userAddress: this.profileForm.address,
                userPhoneNumber: this.profileForm.phone_number
            }
            axiosApiIntances.patch(`users/${this.$route.params.id}`, data)
            .then((res) => {
                console.log(res)
                this.$router.push({ name: "Profile", params: this.$route.params.id })
            })
            .catch((err) => {
                console.log(err.response)
            })
        }
    },
    created() {
        this.getProfileDetail()
    }
}
</script>

<style>

</style>