<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-text-field v-model="name" />
      <v-text-field v-model="title" />
      <v-text-field v-model="wish" />
      <v-text-field v-model.number="price" />
    </v-col>
    <v-col>
      <v-btn @click="submit">Submit</v-btn>
    </v-col>
    <v-col v-if="response" cols="12">
      <div v-for="result in response" :key="result._id">
        <v-btn @click="detail(result._id)">{{ result.name }}</v-btn>
        <p>{{ result.title }}</p>
        <p>{{ result.wish }}</p>
        <p>{{ result.price }}</p>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      name: null,
      title: null,
      wish: null,
      price: 0,
      response: null
    }
  },
  mounted () {
    this.test()
  },
  methods: {
    submit () {
      this.$axios.post('http://localhost:8000/api/stuff', {
        name: this.name,
        title: this.title,
        wish: this.wish,
        price: this.price
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async test() {
      this.response = await this.$axios.$get('http://localhost:8000/api/stuff')
      console.log(this.response)
    },
    async detail(smt) {
      const detail = await this.$axios.$get(`http://localhost:8000/api/stuff/${smt}`)
      console.log(detail)
    }
  }
}
</script>
