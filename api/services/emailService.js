const { Event, Ticket } = require('../models');
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to, subject, html) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }

  async sendPurchaseEmail(data) {
    try {
      const event = await Event.findByPk(data.eventId);
      if (!event) {
        throw new Error('Event not found or could not fetch event details');
      }

      const ticket = await Ticket.findByPk(data.ticketId);
      if (!ticket) {
        throw new Error('QR code not found or could not fetch QR code');
      }

      const subject = `Ticket Purchased: ${event.title}`;
      const html = `
        <h1>You have purchased ${data.quantity} ticket(s) for ${event.title}</h1>
        <p>Date: ${new Date(event.date).toLocaleString()}</p>
        <p>Location: ${event.location}</p>
        <p>Details: ${event.description}</p>
        <img src="${ticket.qrCode}" alt="QR Code" />
      `;
      await this.sendEmail(data.email, subject, html);
      console.log('Purchase email sent successfully.');
    } catch (error) {
      console.error('Error sending purchase email:', error);
      throw error;
    }
  }

  async sendEventUpdateEmails(event, data) {
    try {
      const tickets = await Ticket.findAll({ where: { eventId: event.id } });
      if (!tickets || tickets.length === 0) {
        throw new Error('Failed to fetch ticket purchases');
      }

      const recipients = tickets.map(ticket => ticket.email);
      const subject = `Event Update: ${data.title}`;
      const html = `
        <h1>Update on Event: ${event.title}</h1>
        <p>Status: ${event.status}</p>
        <p>New Date: ${event.date ? new Date(event.date).toLocaleString() : 'N/A'}</p>
        <p>Location: ${event.location}</p>
        <p>Details: ${event.description}</p>
      `;

      const sendPromises = recipients.map(email => this.sendEmail(email, subject, html));
      await Promise.all(sendPromises);
      console.log('Event update emails sent successfully to all ticket holders.');
    } catch (error) {
      console.error('Error sending event update emails:', error);
      throw error;
    }
  }
}

module.exports = new EmailService();
