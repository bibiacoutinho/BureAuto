<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        align="left"
      >
        Desempenho dos Anúncios
      </v-col>
    </v-row>
    <v-row justify="center">
      <ReportCard
        title="Engajamento da plataforma"
        :content="platform"
        v-if="is_admin"
      />
      <ReportCard
        :title="`Engajamento dos anúncios favoritos ${is_admin ? 'na plataforma' : ''}`"
        :content="favorite"
      />
      <ReportCard
        title="Visão geral dos anúncios na plataforma"
        :content="advertisementStatus"
        v-if="is_admin"
      />
      <ReportCard
        :title="`Engajamento dos anúncios ${is_admin ? 'na plataforma' : ''}`"
        :content="statusAdvertisement"
      />
      <ReportCard
        title="Relação geral de vendas dos anúncios"
        :content="soldAdvertisement"
      />
      <ReportCard
        :title="`Mais vendidos por categoria  ${is_admin ? 'na plataforma' : ''}`"
        :content="soldByModel"
      />
      <ReportCard
        title="Disponibilidade dos anúncios"
        :content="time"
      />
    </v-row>
  </v-container>
</template>

<script src="./Reports.js"></script>