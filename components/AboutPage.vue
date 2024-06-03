<script setup lang="ts">
//
</script>

<template>
  <div>
    <section class="section about-1">
      <div class="bg-about bg-cover bg-center w-100 h-100 flex items-center justify-center">
        <img
          src="../assets/images/logo.png"
          alt="AbrigosRS"
          width="55%"
        >
      </div>
    </section>

    <section class="section about-2 text-xs sm:text-sm md:text-base">
      <div class="flex flex-col gap-2 md:px-4 lg:px-[12rem]">
        <h1 class="font-bold underline text-2xl">
          Sobre
        </h1>

        <div class="flex flex-wrap sm:flex-nowrap gap-2 md:gap-6">
          <div class="col">
            <p>
              A atual crise climática que impactou o Estado do Rio Grande do Sul desabrigou mais de 540.633 pessoas, destruiu cidades, infraestrutura e lares gaúchos. Imediatamente o movimento de solidariedade promoveu a criação de centenas de abrigos voluntários, na intenção de acolher as famílias desabrigadas e, inclusive, seus pet’s. Iniciada as estruturas de acolhimento, o desafio de geri-las impôs a necessidade de integração. Diante do cenário, a secretaria de Inovação de Porto Alegre/RS lançou um grande desafio ao setor de tecnologia: criar aplicações capazes de suprir as lacunas provocadas pela ausência de infraestrutura de gestão própria para situações extremas como estas.
            </p>

            <p>
              Assim, a aplicação AbrigaRS surgiu como uma das diversas respostas inovadoras e solidárias às crises provocadas pelas enchentes no Rio Grande do Sul em 2024. Com mais de 100 profissionais da área de tecnologia, incluindo desenvolvedores, analistas de dados e cientistas de dados e juristas, esse grupo voluntário uniu-se para criar soluções tecnológicas que pudessem ajudar as vítimas das enchentes de maneira eficiente e organizada.
            </p>
          </div>

          <div class="col">
            <p>
              A iniciativa teve início com o desenvolvimento do sistema AbrigaRS, que integra informações sobre os abrigos para que os órgãos públicos possam acessar dados em tempo real sobre os desabrigados e suas necessidades. Esse sistema é fundamental para coordenar melhor a distribuição de recursos e assistência.
            </p>

            <p>
              Além disso, os voluntários também desenvolveram o aplicativo Apoio Enchentes RS, inspirado no modelo do Tinder, para conectar as necessidades dos abrigos diretamente com a sociedade. Através desse aplicativo, a população pode se informar sobre as necessidades específicas dos abrigos e oferecer ajuda de maneira prática e direta.
            </p>

            <p>
              Essa rede de solidariedade e inovação não apenas oferece suporte imediato às vítimas das enchentes, mas também cria um modelo de resposta que pode ser replicado em futuras crises, mostrando o poder da tecnologia e da colaboração comunitária em momentos de necessidade.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section about-3">
      <div class="timeline w-100 h-100 flex items-center justify-center">
        <img
          src="../assets/images/timeline_objects.png"
          alt="AbrigosRS"
          width="40%"
        >
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.col{
    flex: 1;
    display: block;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    // padding: .75rem .75px 0px 0px;
    min-width: 300px;
}

.col p {
    margin: 0 0 1em 0;
}

body {
  @apply overflow-x-hidden;
  scroll-snap-type: y mandatory;
  height: 100vh;
  overflow-y: scroll;
}

.section {
  scroll-snap-align: start;
  height: 94vh;
}

.about-1, .about-3{
    padding: 0;
}

.timeline{
    background: conic-gradient(from 180deg at 50% 50%, #007A73 -37.69deg, #62AD9B 27.88deg, #64A898 87.13deg, #62AC9A 107.12deg, #5FB19E 136.53deg, #007A73 322.31deg, #62AD9B 387.88deg);

}
@media (max-width: 768px) {
    .about-2{
        padding-top: 12px;
    }
}
</style>
