<template>
  <div class="mx-5 mt-5">
      <h1>Home</h1>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Attends Now</button>

      <div class="modal" tabindex="-1" id="exampleModal" >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Create An Attendance</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleCreateAttendance">
                <div class="form-group">
                  <label for="notes" class="mb-3">Notes</label>
                  <input type="text" name="notes" v-model="attendanceForm.notes" class="form-control">
                </div>
                <div class="form-group">
                  <label for="status" class="mb-3">Status</label>
                  <input type="text" name="status" v-model="attendanceForm.status" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary mt-3">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <table class="table table-bordered border-primary mt-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Attendance Notes</th>
            <th>Attendance Status</th>
            <th>Start Time</th>
            <th>Finish Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(attendance, index) in allData" :key="index">
            <th>{{ attendance.attendances_id }}</th>
            <td>{{ attendance.attendances_notes }}</td>
            <td>{{ attendance.attendances_status }}</td>
            <td>{{ attendance.attendances_start_dttm }}</td>
            <td>{{ attendance.attendances_stop_dttm }}</td>
            <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal" @click="getAttendanceDetail(attendance.attendances_id)">Update</button></td>
          </tr>
        </tbody>
      </table>

       <div class="modal" tabindex="-1" id="updateModal" >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Update An Attendance</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="handleUpdateAttendance">
                <div class="form-group">
                  <label for="notes" class="mb-3">Notes</label>
                  <input type="text" name="notes" v-model="updateAttendanceForm.notes" class="form-control">
                </div>
                <button type="submit" class="btn btn-primary mt-3">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axiosApiIntances from "../../utils/axios"

const user_id = localStorage.getItem('user_id');

export default {
    name: "Home",
    data() {
      return {
        allData: [],
        attendanceForm: {
          notes: '',
          status: ''
        },
        updateAttendanceForm: {
          notes: ''
        },
        idDetail: ''
      }
    },
    methods: {
      getAllAttendancesByUserId() {
        axiosApiIntances.get(`attendances/users/${user_id}`)
        .then((res) => {
          console.log(res)
          this.allData = res.data.data
        })
        .catch((err) => {
          console.log(err.response)
        })
       },
      getAttendanceDetail(id) {
        // console.log(id)
        axiosApiIntances.get(`attendances/${id}`)
        .then((res) => {
          console.log(res)
          this.updateAttendanceForm.notes = res.data.data[0].attendances_notes
          this.idDetail = id
        })
        .catch((err) => {
          console.log(err.response)
        })
      },
      handleCreateAttendance() {
        const data = {
          attendancesNotes: this.attendanceForm.notes,
          attendancesStatus: this.attendanceForm.status
        }
        axiosApiIntances.post('attendances', data)
        .then((res) => {
          console.log(res)
          this.$router.push('/home')
          this.getAllAttendancesByUserId()
        })
        .catch((err) => {
          console.log(err.response)
        })
      },
      handleUpdateAttendance() {
        const detailId = this.idDetail
        console.log(detailId)
        const data = {
          attendancesNotes: this.updateAttendanceForm.notes
        }
        axiosApiIntances.patch(`attendances/${detailId}`, data)
        .then((res) => {
          console.log(res)
          this.getAllAttendancesByUserId()
        })
        .catch((err) => {
          console.log(err.response)
        })
      }
    },
    created() {
      this.getAllAttendancesByUserId()
    }
}
</script>

<style>

</style>