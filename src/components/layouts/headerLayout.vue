<template>
<div>
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center rounded p-3 palette-1">
        <div class="text-white"><span class="fw-bold">USUÁRIO:</span> {{userName}}</div>
        <button class="btn btn-primary fw-bold" @click="logout">SAIR</button>
    </div>
  </div>
  <div>
  </div>
</div>
</template>

<script>

export default {
  name: 'headerLayout',
  data () {
    return {
      userName: ''
    }
  },
  mounted () {
    this.userName = this.$store.getters.userName
  },
  methods: {
    logout (e) {
      e.preventDefault()
      this.$store.commit('logout')
      this.$router.push('/login')
      this.$toast.open({ message: 'Você saiu da sua conta!', type: 'info' })
    }
  }
}
</script>

<style>

</style>
