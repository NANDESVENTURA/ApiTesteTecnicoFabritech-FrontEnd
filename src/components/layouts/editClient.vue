<template>
    <div class="modal fade" id="editClient" tabindex="-1" aria-labelledby="editClientModal" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header text-light bg-secondary">
                    <h5 class="modal-title" id="exampleModalLabel"><i class="fa-solid fa-plus"></i> Editar cliente</h5>
                    <button ref="Close" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Fechar"></button>
                </div>
                <form @submit.prevent="editClient">
                    <!-- <form> -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-5">
                                <label class="form-label" for="nome">Nome</label>
                                <input type="text" class="form-control mb-3" id="nome" v-model="nome" required>
                            </div>

                            <div class="col-4">
                                <label class="form-label" for="email">Email</label>
                                <input type="text" class="form-control mb-3" id="email" v-model="email" required>
                            </div>

                            <div class="col-3">
                                <label class="form-label" for="nascimento">Nascimento</label>
                                <input type="date" class="form-control mb-3" id="nascimento" v-model="nascimento"
                                    required>
                            </div>

                            <div class="col-2">
                                <label class="form-label" for="cpf">CPF</label>
                                <input type="text" class="form-control mb-3" id="cpf" v-model="cpf" minlength="11"
                                    required>
                            </div>

                            <div class="col-2">
                                <label class="form-label" for="telefone">Telefone</label>
                                <input type="text" class="form-control mb-3" id="telefone" v-model="telefone"
                                    minlength="11" required>
                            </div>

                            <div class="col-4">
                                <label class="form-label" for="nomeMae">Mãe</label>
                                <input type="text" class="form-control mb-3" id="nomeMae" v-model="nomeMae" required>
                            </div>

                            <div class="col-4">
                                <label class="form-label" for="nomePai">Pai</label>
                                <input type="text" class="form-control mb-3" id="nomePai" v-model="nomePai" required>
                            </div>

                            <div class="col-3">
                                <label class="form-label" for="cep">CEP</label>
                                <input type="text" class="form-control mb-3" id="cep" v-model="cep" minlength="8"
                                    maxlength="8" required>
                            </div>

                            <div class="col-4">
                                <label class="form-label" for="rua">Rua</label>
                                <input type="text" class="form-control mb-3" id="rua" v-model="rua" required>
                            </div>

                            <div class="col-2">
                                <label class="form-label" for="numero">Numero</label>
                                <input type="text" class="form-control mb-3" id="numero" v-model="numero" minlength="1"
                                    required>
                            </div>

                            <div class="col-3">
                                <label class="form-label" for="bairro">Bairro</label>
                                <input type="text" class="form-control mb-3" id="bairro" v-model="bairro" required>
                            </div>

                            <div class="col-3">
                                <label class="form-label" for="estado">Estado</label>
                                <input type="text" class="form-control mb-3" id="estado" v-model="estado" required>
                            </div>

                            <div class="col-3">
                                <label class="form-label" for="cidade">Cidade</label>
                                <input type="text" class="form-control mb-3" id="cidade" v-model="cidade" required>
                            </div>

                            <div class="col-12">
                                <div v-if="alertText" :class="alertClass" role="alert">
                                    {{ alertText }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                            id="closemodal">Cancelar</button>
                        <button type="submit" class="btn btn-success"><i class="fa-solid fa-plus"></i>
                            Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'editClient',
    data() {
        return {
            id: null,
            nome: null,
            email: null,
            telefone: null,
            cpf: null,
            nascimento: null,
            nomeMae: null,
            nomePai: null,
            cep: null,
            rua: null,
            bairro: null,
            numero: null,
            estado: null,
            cidade: null,
            alertText: false,
            alertClass: null
        }
    },
    props: {
        editClientData: Object
    },
    watch: {
        cep: function (newCep, oldCep) {
                this.getCep(newCep)
        }
    },
    methods: {
        updateInfo(){
            this.id = this.editClientData.id
            this.nome = this.editClientData.name
            this.email = this.editClientData.email
            this.telefone = this.editClientData.telephone
            this.cpf = this.editClientData.cpf
            this.nascimento = this.dataAtualFormatada(this.editClientData.birth_date)
            this.nomeMae = this.editClientData.mother_name
            this.nomePai = this.editClientData.father_name
            this.cep = this.editClientData.cep
            this.rua = this.editClientData.address
            this.bairro = this.editClientData.district
            this.numero = this.editClientData.number
            this.estado = this.editClientData.state
            this.cidade = this.editClientData.city
        },
        async getCep (cepDigited) {
            const { data: information } = await axios.get(`http://viacep.com.br/ws/${cepDigited}/json`)
            if (!information.error) {
                this.rua = information.logradouro
                this.cidade = information.localidade
                this.bairro = information.bairro
                this.estado = information.uf
            }
        },

        async editClient() {
            const data = {
                    name: this.nome,
                    email: this.email,
                    telephone: this.telefone,
                    cpf: this.cpf,
                    birth_date: this.nascimento,
                    mother_name: this.nomeMae,
                    father_name: this.nomePai,
                    cep: this.cep,
                    address: this.rua,
                    number: this.numero,
                    district: this.bairro,
                    city: this.cidade,
                    state: this.estado
                }
            const headers = {
                headers: {
                    Authorization: 'Bearer ' + this.$store.getters.token
                }
            }

            axios.put(`http://localhost:3000/client/${this.id}`, data, headers)
            .then((response) => {
                this.alertText = 'Cliente editado com sucesso!'
                this.alertClass = 'alert alert-success'
                setTimeout(() => {
                    this.alertText = null
                    this.$refs.Close.click()
                    this.$router.go()
                }, 2000)
            })
            .catch((err) => {
                this.alertText = err.response.data.error
                this.alertClass = 'alert alert-danger'
                setTimeout(() => {
                this.alertText = null
                }, 5000)
            })
        },
        dataAtualFormatada(data){
            var d = new Date(data),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }
    }
}
</script>
