<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-text-field />
      <v-text-field />
      <v-text-field />
      <v-text-field />
    </v-col>
    <v-col cols="12">
      Future displaying
    </v-col>
  </v-row>
</template>
<script>
export default {
  mounted () {
    this.test()
  },
  methods: {
    async test() {
      const test = await this.$axios.$get('http://localhost:8000/api/stuff')
      console.log(test)
    }
  }
}
</script>
