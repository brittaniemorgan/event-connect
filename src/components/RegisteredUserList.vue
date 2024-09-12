<template>
  <div class="registered-users">
    <div v-if="registeredUsers.length === 0" class="no-users">
      <p>No users have registered for this event.</p>
    </div>
    <ul>
      <li v-for="user in registeredUsers" :key="user.id" @click="selectUser(user)">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </li>
    </ul>
    <UserDetails v-if="selectedUser" :user="selectedUser" @close="selectedUser = null" />
  </div>
</template>

<script>
import UserDetails from '@/components/UserDetails.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'RegisteredUsersList',
  components: {
    UserDetails
  },
  props: {
    eventId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedUser: null
    };
  },
  computed: {
    ...mapGetters(['registeredUsers'])
  },
  methods: {
    ...mapActions(['fetchRegisteredUsers']),
    selectUser(user) {
      this.selectedUser = user;
    }
  },
  created() {
    this.fetchRegisteredUsers(this.eventId);
    console.log(this.registeredUsers)
  },
  watch: {
    eventId(newEventId) {
      this.fetchRegisteredUsers(newEventId);
    }
  }
};
</script>

<style scoped>
.registered-users {
  padding: 20px;
}

.registered-users ul {
  list-style-type: none;
  padding: 0;
}

.registered-users li {
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.registered-users li:hover {
  background: #f0f0f0;
}
</style>