<template>
  <header>
    <section>
      <div class="col1">
        <router-link to="/">
          <img
            height="48"
            :src="require('@/assets/WL.png')"
            alt="Manassa Logo"
          />
        </router-link>
        <ul class="inline">
          <li>
            <router-link to="/">Dashboard</router-link>
          </li>

          <li>
            <router-link to="/chat">Messaging</router-link>
          </li>
          <li>
            <router-link to="/dashboard">Create Post</router-link>
          </li>
          <li>
            <router-link to="/settings">Settings</router-link>
          </li>

          <li><a @click="logout()" class="button-logout">Logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
