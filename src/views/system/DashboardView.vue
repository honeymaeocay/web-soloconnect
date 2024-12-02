<script setup>
import AppLayout from '@/components/layout/AppLayout.vue'
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

// Utilize pre-defined vue functions
const { mobile } = useDisplay()

const isDrawerVisible = ref(mobile.value ? false : true)
</script>

<template>
  <AppLayout
    :is-with-app-bar-nav-icon="true"
    @is-drawer-visible="isDrawerVisible = !isDrawerVisible"
  >
    <template #navigation>
      <SideNavigation :is-drawer-visible="isDrawerVisible"></SideNavigation>
    </template>
    <template #content>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <WelcomeWidget :theme="theme"></WelcomeWidget>
          </v-col>

          <v-col cols="12" md="8">
            <ProductsWidget :theme="theme"></ProductsWidget>
          </v-col>

          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="12" v-if="isSuperAdmin">
                <CodeGeneratorWidget></CodeGeneratorWidget>
              </v-col>

              <v-col cols="12">
                <MapWidget></MapWidget>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </AppLayout>
</template>
