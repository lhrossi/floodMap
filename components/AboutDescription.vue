<script setup lang="ts">
//
</script>

<template>
  <section class="section about text-xs sm:text-sm md:text-base">
    <div class="flex flex-col gap-6 md:px-4 lg:px-12 xl:px-[22rem]">
      <span class="font-semibold text-md md:text-3xl mx-auto pb-4 underline">
        SOBRE
      </span>

      <!-- <div class="flex flex-wrap sm:flex-nowrap gap-2 md:gap-12"> -->
      <div class="columns-1 md:columns-2 lg:gap-16 md:gap-4">
        <div class="w-full col text-justify">
          <p>
            A atual crise climática que impactou o Estado do Rio Grande do Sul desabrigou mais de 540.633 pessoas, destruiu cidades, infraestrutura e lares gaúchos. Imediatamente o movimento de solidariedade promoveu a criação de centenas de abrigos voluntários, na intenção de acolher as famílias desabrigadas e, inclusive, seus pet’s. Iniciada as estruturas de acolhimento, o desafio de geri-las impôs a necessidade de integração. Diante do cenário, a secretaria de Inovação de Porto Alegre/RS lançou um grande desafio ao setor de tecnologia: criar aplicações capazes de suprir as lacunas provocadas pela ausência de infraestrutura de gestão própria para situações extremas como estas.
          </p>

          <p>
            Assim, a aplicação AbrigosRS surgiu como uma das diversas respostas inovadoras e solidárias às crises provocadas pelas enchentes no Rio Grande do Sul em 2024. Com mais de 100 profissionais da área de tecnologia, incluindo desenvolvedores, analistas de dados e cientistas de dados e juristas, esse grupo voluntário uniu-se para criar soluções tecnológicas que pudessem ajudar as vítimas das enchentes de maneira eficiente e organizada.
          </p>
        </div>

        <div class="w-full col text-justify">
          <p>
            A iniciativa teve início com o desenvolvimento do sistema AbrigosRS, que integra informações sobre os abrigos para que os órgãos públicos possam acessar dados em tempo real sobre os desabrigados e suas necessidades. Esse sistema é fundamental para coordenar melhor a distribuição de recursos e assistência.
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
</template>

<style lang="scss" scoped>
section span {
    display: table;
}

.about{
    height: fit-content
}

@media (max-width: 768px) {
    .about{
        padding-top: 12px;
    }
}
</style>
