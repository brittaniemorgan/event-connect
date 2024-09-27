<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Cancel Event</h3>
      <form @submit.prevent="confirmCancellation">
        <p>Are you sure you want to cancel "{{ eventData.title }}"?</p>
        <label for="cancellationReason">Reason for cancellation:</label>
        <input v-model="cancellationReason" id="cancellationReason" placeholder="Enter reason" required />

        <div class="modal-actions">
          <button type="submit" class="btn-warning">Confirm Cancellation</button>
          <button type="button" @click="$emit('close')" class="btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CancelEventModal',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      eventData: { ...this.event },
      cancellationReason: ''
    };
  },
  methods: {
    confirmCancellation() {
      this.$emit('cancel-event', { ...this.eventData, status: "Cancelled", cancelReason: this.cancellationReason });
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal-content p {
  margin-bottom: 10px;
}

.modal-content label {
  display: block;
  margin-bottom: 5px;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.btn-warning,
.btn-secondary {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-warning {
  background-color: #f39c12;
  color: white;
}

.btn-warning:hover {
  background-color: #d35400;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #4a4f54;
}
</style>
