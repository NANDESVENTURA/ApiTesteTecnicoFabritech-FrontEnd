<template>
  <div class="container ">
    <div class="row ">
      <div class="col-12 offset-lg-4 col-lg-4" style="margin-top: 8em">
        <div class="card ">
          <div class="card-header palette-2 text-white">
            Fazer login
          </div>
          <div class="card-body">
            <form @submit="login">

              <label for="email" class="form-label">E-mail</label>
              <input type="text" class="form-control mb-3" v-model="email" required>

              <label for="password" class="form-label">Senha</label>
              <input type="password" class="form-control mb-3" v-model="password" required>

              <router-link to="registrar">Criar uma conta</router-link>

              <div class="d-flex justify-content-end">
                <button class="btn btn-primary" type="submit"><i class="fa-solid fa-right-to-bracket"></i> Fazer login</button>
              </div>

              <div v-if="alertText" :class="alertClass + ' mt-3'" role="alert">
                {{alertText}}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data () {
    return {
      email: null,
      password: null,
      alertClass: null,
      alertText: null
    }
  },
  methods: {
    async login (e) {
      e.preventDefault()

      axios.post('http://localhost:3000/auth', {
        email: this.email,
        password: this.password
      })
      .then((response) => {
          console.log('aq1')
          console.log(response)
          this.$store.commit('authenticate', { token: response.data.token, user: response.data.user })
          this.alertText = response.data.msg
          this.alertClass = 'alert alert-success'
          setTimeout(() => {
            this.$router.push('/')
          }, 3000)
        })
        .catch((err) => {
          console.log('aq2')
          if (err.response) {
            this.alertText = err.response.data.error
            this.alertClass = 'alert alert-danger'
            setTimeout(() => {
              this.alertText = null
            }, 5000)
          } else {
            console.log('aq3')
            console.log(err)
          }
        })
    }
  }
}
</script>

<style>

</style>
