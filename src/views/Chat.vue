<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.location }}</p>
          <div class="create-post">
            <p>create a message</p>
            <form @submit.prevent>
              <textarea
                v-model.trim="message.content"
                v-on:keyup.enter="createMessage()"
              ></textarea>
              <button
                @click="createMessage()"
                :disabled="message.content === ''"
                class="button"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="messages.length">
          <div v-for="message in messages" :key="message.id" class="post">
            <h5>{{ message.userName }}</h5>
            <span>{{ message.createdOn | formatDate }}</span>
            <p>{{ message.content }}</p>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { messageCollection } from '../firebase/firebase'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      message: {
        content: ''
      }
    }
  },
  computed: {
    ...mapState(['userProfile', 'messages'])
  },
  methods: {
    createMessage() {
      this.$store.dispatch('createMessage', { content: this.message.content })
      this.message.content = ''
    },

    async viewPost(post) {
      const docs = await commentsCollection.where('postId', '==', post.id).get()

      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })

      this.fullPost = post
      this.showPostModal = true
    },
    closePostModal() {
      this.postComments = []
      this.showPostModal = false
    }
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return '-'
      }

      let date = val.toDate()
      return moment(date).fromNow()
    }
  }
}
</script>

<style lang="scss" scoped></style>
