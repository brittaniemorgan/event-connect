const { Event, Ticket, User } = require('../models');
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

  async sendNewEventEmail(event) {
    try {
      const organizer = await User.findByPk(event.organizerId);
      const recipients = [organizer.email];
      const subject = `Event Added: ${event.title}`;
      const html = `
        <h1>New Event Details: ${event.title}</h1>
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

  async sendEventUpdateEmail(event) {
    try {
      const tickets = await Ticket.findAll({ where: { eventId: event.id } });
      if (!tickets) {
        throw new Error('Failed to fetch ticket purchases');
      }
      
      const organizer = await User.findByPk(event.organizerId);
      const recipients = tickets.map(ticket => ticket.email).concat(organizer?.email);
      const subject = `Event ${event.status === "Cancelled" ? "Cancellled" : "Update"}: ${event.title}`;
      const html = `
        <h1>Event ${event.status === "Cancelled" ? "Event Cancelled" : "Event Update"}: ${event.title}</h1>
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

  async sendTicketAddedEmail(ticket) {
    try {
      const event = await Event.findByPk(ticket.eventId);
      if (!event) {
        throw new Error('Event not found');
      }
  
      const organizer = await User.findByPk(event.organizerId);
      if (!organizer) {
        throw new Error('Organizer not found');
      }
  
      const qrCodePath = ticket.qrCode;
  
      const subject = `New Tickets Added for ${event.title}`;
      const html = `
        <h1>New Tickets Added to Your Event: ${event.title}</h1>
        <p>Status: ${event.status}</p>
        <p>Date: ${new Date(event.date).toLocaleString()}</p>
        <p>Location: ${event.location}</p>
        <p>Details: ${event.description}</p>
        <p>New Ticket Added:</strong> ${ticket.ticketType}</p>
        <p>Total Tickets:</strong> ${ticket.quantity}</p>
        <p>See the attached QR code for the new tickets:</p>
        <img src="cid:qrCode" alt="Ticket QR Code" />
      `;
  
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: organizer.email,
        subject,
        html,
        attachments: [
          {
            filename: 'ticket-qr-code.png',
            path: qrCodePath, 
            cid: 'qrCode'
          }
        ]
      };
  
      await this.transporter.sendMail(mailOptions);
      console.log('Ticket added email sent to organizer successfully.');
    } catch (error) {
      console.error('Error sending ticket added email:', error);
      throw error;
    }
  }
  
}

module.exports = new EmailService();
