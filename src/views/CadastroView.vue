<template>
  <body>
    <header>
      <img src="/images/NEXUS.png" alt="" class="logo" />
    </header>
    <main  class="container mt-5">
      <b-form @submit="onSubmit">
        <b-row>
            <b-col>
              <b-form-group
                id="input-group-1" label="Primeiro Nome:" label-for="pNome">
                <b-form-input
                  id="pNome"
                  v-model="form.pNomeUser"
                  type="text"
                  placeholder="Digite seu primeiro nome"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-2" label="Sobrenome:" label-for="sbNome">
                <b-form-input
                  id="sbNome"
                  v-model="form.sobrenomeUser"
                  type="text"
                  placeholder="Digite seu sobrenome"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-form-group
                id="input-group-3" label="CPF:" label-for="cpf">
                <b-form-input
                  id="cpf"
                  v-model="form.cpfUser"
                  type="text"
                  placeholder="Digite seu primeiro CPF"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-4" label="Data de Nascimento:" label-for="nasc">
                <b-form-input
                  id="nasc"
                  v-model="form.nascUser"
                  type="date"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-form-group
                id="input-group-5" label="CEP:" label-for="cep">
                <b-form-input
                  id="cep"
                  v-model="form.cepUser"
                  type="text"
                  placeholder="Digite seu CEP"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-6" label="Telefone:" label-for="tel">
                <b-form-input
                  id="tel"
                  v-model="form.telUser"
                  placeholder="Digite aqui seu número de telefone"
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-form-group
                id="input-group-7" label="Email:" label-for="eMail">
                <b-form-input
                  id="eMail"
                  v-model="form.emailUser"
                  type="email"
                  placeholder="Digite seu email"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-8" label="Senha:" label-for="senha">
                <b-form-input
                  id="senha"
                  v-model="form.senhaUser"
                  type="password"
                  placeholder="Digite sua senha"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
        </b-row>
        <div class="text-center mt-3">
          <small>
            <span>Não sabe seu CEP? </span>
            <a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t">Clique aqui</a>
          </small>
        </div>
        <div class="mt-3" style="display: flex; justify-content: center">
          <b-button type="submit" style="background-color: #220a60; padding: 2vh 4vw;">Criar Conta</b-button>
        </div>
      </b-form>
    </main>
    <footer class="mt-5">
      <!-- Pagamentos -->
      <h4>Formas de pagamento</h4>
      <div class="imgF">
        <img src="/images/footer/visa.png" alt="Visa" class="if">
        <img src="/images/footer/mastercard_vrt_pos_92px_2x.png" alt="Mastercard" class="if">
        <img src="/images/footer/Banco_Itaú_logo.svg.png" alt="Itaú" class="if">
        <img src="/images/footer/logo-pix-520x520.png" alt="Pix" class="if">
      </div>
      <!-- Redes Sociais -->
      <h4>Redes Sociais</h4>
      <div class="imgF">
        <a href=""><img src="/images/footer/face.png" alt="Twitter" class="if"></a>
        <a href=""><img src="/images/footer/Instagram_icon.webp" alt="Instagram" class="if"></a>
      </div>
      <!-- Atendimento -->
      <h4>Atendimento</h4>
      <div class="imgF">
        <a href=""><img src="/images/footer/whatsapp.png" alt="(81) 90000-0000" class="if"></a>
        <a href=""><img src="/images/footer/gmail.png" alt="Nexus69@gmail.com" class="if"></a>
      </div>
      <br>
      <p style="font-size: 115%"> &copy; Todos os Direitos Reservados a Equipe Nexus - Sesi Ibura 2024</p>
    </footer>
  </body>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          pNomeUser: '',
          sobrenomeUser: '',
          cpfUser: '',
          nascUser: '',
          telUser: '',
          cepUser: '',
          emailUser: '',
          senhaUser: '',
        }
      }
    },
    methods: {
      onSubmit() {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>

<style>
  header{
    background-color: #190C3C;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  .logo{
    height: 200px;
    width: auto;
  }
  
  .cep {
    text-decoration: none;
    color: #220a60;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  footer{
    text-align: center;
    background-color: #1D0D46;
    color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 3vh 0;
  }

  .imgF{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3cqw;
}

  .if{
    height: 60px;
    width: auto;
    margin: 1vw;
    display: flex;
  }
</style>
