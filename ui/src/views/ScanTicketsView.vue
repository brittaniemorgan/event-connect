<template>
  <div class="scanner">
    <h1>QR Code Scanner</h1>
    <div id="reader" style="width:500px"></div>
    <p>Scanned Result: {{ scannedResult }}</p>
  </div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode";
import { mapActions, mapGetters } from "vuex";

export default {
  name: 'ScanTicketsView',
  data() {
    return {
      scannedResult: '',
      verificationMessage: ''
    };
  },
  computed: {
    ...mapGetters(['tickets', 'flashMessage', 'flashType'])
  },
  methods: {
    ...mapActions(['generateTickets', 'setFlashMessage']),
    verifyQRCode(decodedText) {
      const ticket = this.tickets.filter(ticket => ticket.qrCode === decodedText);
      this.setFlashMessage({ message: `Ticket ID with QR Code ${decodedText} is valid!`, type: 'info' });
      if (ticket == []) {
        this.setFlashMessage({ message: `Ticket ID with QR Code ${decodedText} is valid!`, type: 'info' });
      } else {
        this.setFlashMessage({ message: 'Invalid ticket.', type: 'danger' });
      }
      this.restartScanning();
    },
    restartScanning() {
      setTimeout(() => {
        this.startScanning();
        this.scannedResult = "";
      }, 3000);
    },
    startScanning() {
      const html5QrCode = new Html5Qrcode("reader");
      const qrCodeSuccessCallback = (decodedText) => {
        this.scannedResult = decodedText;
        this.verifyQRCode(decodedText);
        html5QrCode.stop().then(() => {
          console.log("QR Code scanning stopped.");
        }).catch((err) => {
          console.log("Error stopping QR Code scanner: ", err);
        });
      };

      const config = { fps: 10, qrbox: 250 };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback
      ).catch(err => {
        console.log("Error starting QR Code scanner: ", err);
      });
    }
  },
  mounted() {
    this.generateTickets(this.$route.params.eventId);
    this.startScanning();
  }
};
</script>

<style scoped>
.scanner {
  height: 100vh;
  font-family: Arial, sans-serif;
  text-align: center;
}

#reader {
  border: 1px solid black;
  margin-bottom: 10px;  
  margin: 0 auto;
}

.flash-message {
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #000000;
  font-size: 1em;
  font-weight: bold;
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 1;
  transform: translateY(0);
}

.flash-message.fade-out {
  opacity: 0;
  transform: translateY(-20px);
}

.flash-info {
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
  color: #0c5460;
}

.flash-warning {
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
}

.flash-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}
</style>
