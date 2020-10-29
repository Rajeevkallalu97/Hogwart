<template>
  <div id="dashboard">
    <div class="message-body mt-3">
      <h3>Chat</h3>

      <div class="card">
        <div class="card-body">
          <div v-if="messages.length">
            <div
              class="shadow p-4 mb-4 bg-white"
              v-for="message in messages"
              :key="message.id"
            >
              <h5 class="mg-text">{{ message.userName }}</h5>
              <span>{{ message.createdOn | formatDate }}</span>
              <p>{{ message.content }}</p>
            </div>
          </div>
          <div v-else>
            <p class="no-results">No Messages</p>
          </div>
        </div>
      </div>
      <div class="centre">
        <input
          v-model.trim="message.content"
          v-on:keyup.enter="createMessage()"
          class="mt-3 mr-2 pl-2 pr-2"
        />
        <button
          class="btn btn-primary"
          @click="createMessage()"
          :disabled="message.content === ''"
        >
          Send
        </button>
      </div>
    </div>
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

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic|Material+Icons');
#app {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
}

.login {
  background: #fff;
  width: 40%;
  height: 50vh;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
}
h3 {
  font-size: 30px;
  text-align: center;
}
input {
  width: 100%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  padding-left: 2px;
  padding-right: 2px;
}
.message-body {
  width: 40%;
  height: 80vh;
  margin: auto;
}
.message-text {
  min-width: 10%;
  border-radius: 4px;
}
.message {
  font-size: 14px;
}
.mg-text {
  color: rgb(0, 195, 255);
  font-weight: bolder;
}
.message-body input {
  width: 80%;
  border-radius: 4px;
  border: 1px solid rgb(156, 156, 156);
  height: 6vh;
  padding-left: 2px;
  padding-right: 2px;
}
.card {
  width: 100%;
  height: 75vh;
  margin: auto;
}
.card-body {
  min-height: 50vh;
  overflow-x: scroll;
}
span {
  display: block;
  font-style: italic;
  font-size: 12px;
  margin-bottom: 0.5rem;
  color: darken($light, 25%);
}
</style>
