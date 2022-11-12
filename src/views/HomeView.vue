<template>
    <div>
        <header-layout />
        <div class="container">
            <div class="row g-2">
                <div class="col-12 col-lg-12">
                    <div class="card shadow" style="max-height: 80vh;overflow-y: auto; overflow-x: hidden;">
                        <div class="card-header palette-2 text-white d-flex justify-content-between">
                            <div>
                                <i class="fa-solid fa-calendar-days"></i> Clientes
                            </div>
                            <button class="btn btn-success btn-sm" data-bs-toggle="modal"
                                data-bs-target="#clientform">+ Novo cliente</button>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <span class="list-group-item" v-if="clients.length == 0">Nenhum cliente encontrado!</span>
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Telefone</th>
                                            <th scope="col">CPF</th>
                                            <th scope="col">Cidade</th>
                                            <th scope="col">Endereço</th>
                                            <th scope="col">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="client in clients" :key="client.id" :id="client.id">
                                            <th scope="row">{{client.id}}</th>
                                            <td>{{client.name}}</td>
                                            <td>{{client.telephone}}</td>
                                            <td>{{client.cpf}}</td>
                                            <td>{{client.city}}</td>
                                            <td>{{client.address}}, {{client.number}}</td>
                                            <td>
                                                <div class="">
                                                    <button class="btn btn-secondary btn-sm me-2" data-bs-toggle="modal"
                                                        @click="editClient(client.id)" data-bs-target="#editClient">
                                                        <i class="fa-solid fa-pencil"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-sm" :key="client.id" id="buttonDel" type="button"
                                                        @click="delClient(client.id)">
                                                        <i class="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-12">
                                <div class="d-flex justify-content-center">
                                    <div v-if="alertText" :class="alertClass" role="alert">
                                        {{ alertText }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <formClient />
                <editClient ref="editClient" :editClientData="editClientData"/>

            </div>
        </div>
    </div>
</template>

<script>
import formClient from '@/components/layouts/formClient.vue'
import editClient from '@/components/layouts/editClient.vue'
import headerLayout from '@/components/layouts/headerLayout.vue'
import axios from 'axios'

export default {
    name: 'HomeView',
    components: {
        headerLayout,
        formClient,
        editClient
    },
    data() {
        return {
            clients: [],
            alertText: false,
            alertClass: null,
            editClientData: null
        }
    },
    created() {
        this.getClients()
    },
    methods: {
        async delClient(id) {
            axios.delete(`http://localhost:3000/client/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + this.$store.getters.token
                },
                data: {
                    id: id
                }
            })
            .then((response) => {
                console.log(response)
                this.alertText = response.data.message
                this.alertClass = 'alert alert-success'
                setTimeout(() => {
                    this.alertText = null
                    this.$router.go()
                }, 2000)
            })
            .catch((err) => {
                if (err.response) {
                    this.alertText = err.response.data.error
                    this.alertClass = 'alert alert-danger'
                    setTimeout(() => {
                    this.alertText = null
                    }, 5000)
                } else {
                    console.log(err)
                }
            })
        },
        async getClients() {
            const token = this.$store.getters.token
            const headers = {
                headers: { Authorization: `Bearer ${token}` }
            }
            try {
                const res = await axios.get('http://localhost:3000/client', headers)
                this.clients = res.data
            } catch (e) {
                console.error(e)
            }
        },
        async editClient(id) {
            const headers = {
                headers: {
                    Authorization: 'Bearer ' + this.$store.getters.token
                }
            }

            axios.get(`http://localhost:3000/client/${id}`, headers)
                .then((response) => {
                    this.editClientData = response.data
                    console.log(this.editClientData)
                    setTimeout(() => {
                        this.$refs.editClient.updateInfo()
                    }, 1000)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
}
</script>

<style>
body {
    background-color: #ede7e3 !important;
}

.palette-1 {
    background-color: #16697a !important;
}

.palette-2 {
    background-color: #489fb5 !important;
}

.palette-3 {
    background-color: #82c0cc !important;
}

.palette-4 {
    background-color: #ede7e3 !important;
}

.palette-5 {
    background-color: #ffa62b !important;
}
</style>
