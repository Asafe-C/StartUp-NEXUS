<template>
    <body>
        <main> <!--Conteúdo-->
            <div class="ladoEsquerdo"> <!--Fundo-->
                <img src="" alt="">
            </div>
            <div class="ladoDireito"> <!--Parte com o Login-->
                <div class="login">
                    <div class="iconeLogin"> <!--Ícone e Texto-->
                        <img src="/images/login/user2.png" alt="Ícone de Usuário">
                        <h2>Faça seu Login</h2>
                    </div>
                    <div>
                        <b-form @submit="onSubmit">
                            <b-input-group class="mb-2">
                                <b-input-group-prepend is-text>
                                    <b-icon icon="person-fill"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input type="text" placeholder="USUÁRIO" style="text-align: center;" v-model="form.user" :state="stateEmail" trim required></b-form-input>
                            </b-input-group>
                            <b-input-group class="mb-2">
                                <b-input-group-prepend is-text>
                                    <b-icon icon="lock-fill"></b-icon>
                                </b-input-group-prepend>
                                <b-form-input type="password" placeholder="SENHA" style="text-align: center;" v-model="form.senha" :state="stateSenha" trim required></b-form-input>
                            </b-input-group>
                            <b-button type="submit" style="padding: 2vh 4vw;" oncursor>Submit</b-button>
                        </b-form>
                    </div>
                </div>
            </div>
        </main>
    </body>
</template>

<script>
    export default {
    data() {
        return {
            form: {
                user: '',
                senha: '',
            },
            userCorreto: localStorage.getItem("emailUsuario"),
            senhaCorreta: localStorage.getItem("senhaUsuario"),
        }
        },
        methods: {
        onSubmit(event) {
            event.preventDefault()
            if (this.form.user == this.userCorreto && this.form.senha == this.senhaCorreta) {
                localStorage.setItem("isLogged", 'true');
                this.$router.push('/');
            }else{
                alert("Usuário ou Senha incorretos!")
            }
        },
        validateState(ref) {
        if (
            this.veeFields[ref] &&
            (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) {
            return !this.veeErrors.has(ref);
        }
        return null;
        }   
    },
    computed: {
            stateEmail() {
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return this.form.user.length > 0 && regexEmail.test(this.form.user)
            },
            stateSenha() {
                return this.form.senha.length >= 6
            },
        }
    }
</script>

<style>
@import '/public/css/login.css';
</style>