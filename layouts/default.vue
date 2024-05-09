<template>
  <v-layout>
    <v-app-bar flat class="border-b">
      <v-toolbar-title class="mr-4">
        <div class="flex">
          <div class="flex items-end align-center">
            <div class="mr-2">
              <AbrigaRsLogo />
            </div>
          </div>
          <div class="flex flex-auto"></div>
          <div class="flex align-center">
            <v-btn color="dark" text :class="{ active: currentButton === 'mapa', 'menu-item': true }"
              @click="() => selectButton('mapa')">
              <span>Mapa</span>
              <div class="underline"></div>
            </v-btn>
            <v-btn color="dark" text :class="{ active: currentButton === 'sobre', 'menu-item': true }"
              @click="() => selectButton('sobre')">Sobre
              <div class="underline"></div>
            </v-btn>
            <v-btn color="dark" text href="https://abrigospoa.web.app/login" target="_blank">Login</v-btn>
          </div>
        </div>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container class="about-modal flex flex-col" v-if="currentButton == 'sobre'" max-width="500px">
        <div class="text">
          <h3> Voluntários de TI desenvolvem soluções para combater os atingidos pelas enchentes
          </h3>
          <p>Soluções Abrigo RS e Apoio a Enchentes vão conectar as necessidades dos abrigos à
            sociedade</p>
          <p>


            No Rio Grande do Sul, são cerca de 315 abrigos ativos no momento. Em Porto Alegre, são
            mais de 100 locais de acolhimento. Esses números modificam a todo o momento devido a
            velocidade que a enchente vem impactando as cidades. Do outro lado, a resposta da
            sociedade e organizações foi intensa no auxílio às vítimas das enchentes, gerando um
            grande volume de informações circulando em whatsapps e outras ferramentas de forma
            informal. Este cenário gerou um ambiente propício para fakenews e aproveitadores.
            Com base neste cenário, o coordenador do Pacto Alegre e secretário de inovação de Porto
            Alegre, Luiz Carlos Pinto da Silva, lançou um desafio para o mercado de tecnologia da
            cidade: “Nunca havíamos enfrentado um momento como este, e sentimos a necessidade de
            uma solução que integrasse com agilidade as informações que estão sendo geradas pelos
            abrigos para atender de forma eficiente as demandas”.
            O desafio foi prontamente atendido por mais de 80 profissionais – entre desenvolvedores,
            analistas de dados, cientistas de dados e programadores através da SUCESU RS
            (Associação dos Usuários de Informática e Telecomunicações do Rio Grande do Sul) – que
            se reuniram de forma voluntária para desenvolver alternativas, que acabaram atendendo
            necessidades de outras regiões do Estado. Este grupo está trabalhando desde sábado, no
            Tecnopuc, no desenvolvimento do sistema Abrigo RS, que vai integrar as informações a
            respeito dos abrigos para que os órgãos públicos possam ter acesso aos dados em tempo
            real sobre os desabrigados e suas necessidades em relação a voluntários e doações. “De
            um desafio nasceu uma rede de apoio de dezenas de profissionais em diferentes lugares, e
            estamos desenvolvendo uma solução para conectar diferentes iniciativas que surgem de
            forma orgânica”, segundo Filipe Toledo, que atua como um dos coordenadores dos
            voluntários da área de TI reunidos no espaço Talento Empreendedor do Tecnopuc. O AbrigosRS já está
            disponível
            para acesso exclusivo de órgãos públicos.
            Durante o trabalho, o grupo percebeu a necessidade de conectar os abrigos à sociedade. O
            coletivo de profissionais contatou o Ministério Público do RS, a SUCESU RS, a empresa
            Gx2 e a PUCRS para ter acesso ao código de um aplicativo que conecta as necessidades
            de crianças de lares à sociedade. A partir dessa fonte, foi gerado o aplicativo Apoio
            Enchentes RS, que vai conectar abrigos à população, profissionais liberais e empresas. A
            proposta é que seja equivalente ao Tinder, conectando abrigos com a população, que terá
            acesso de forma atualizada sobre as necessidades de cada lugar, por outro lado, as
            pessoas e profissionais liberais poderão cadastrar como querem ajudar. O aplicativo está
            em processo de aprovação nas apps stores e em breve estará disponível para o público.
            Junto aos profissionais, as organizações que estão apoiando esta iniciativa são Tecnopuc,
            Instituto Caldeira, Wine Valley Hub, Gx2, Stefanini, SUCESU, Agidesk, Cognitiva Brasil,
            Painel Constru, Navi - Hub de Inteligência Artifical do Tecnopuc, Decola, Volters, Ventiur,
            OvinoPro, Green Thinking, DGM, DSA Engenharia, Procempa, Prefeitura de Porto Alegre,
            Governo do Estado do RS, Procergs, PUCRS, Ministério Público do RS, Datacentrics e
            TecnoUCS.
          </p>
        </div>

        <PrimaryButton color="primary" hoverColor="organge" rounded="xl" size="x-large" text="Voltar"
          :click="() => currentButton = 'mapa'" />
      </v-container>
      <slot></slot>
    </v-main>
  </v-layout>
</template>

<script setup>
import { ref } from 'vue'

const currentButton = ref('mapa')
const selectButton = (button) => {
  currentButton.value = button
}
</script>

<style lang="scss">
.menu-item {
  .underline {
    display: none;
  }
}

.v-btn__content {
  position: relative;
  display: flex;
}

.active {
  color: #1351B4 !important;

  .underline {
    height: 3px;
    position: absolute;
    display: block;
    border-radius: 100px;
    background-color: #4E9FFF;
    bottom: -6px;
    width: 100%;
    max-width: 100%;
    opacity: 0.25;
  }
}

.about-modal {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  background-color: white;
  padding: 32px 25px;
  border-radius: 16px 16px 0px 0px;
  gap: 20px;
  max-height: 90vh;

  .text {
    max-height: 90%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      margin: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #F5F5F5;
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #B2B2B2;
      border-radius: 4px;
      width: 8px;
    }
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0.0025em;
    text-align: left;
  }

  p {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.005em;
    text-align: left;
  }
}



@media (min-width: 600px) {
  .about-modal {
    width: 500px;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    padding: 50px 40px;
    border-radius: 16px;
    height: max-content;
  }
}
</style>