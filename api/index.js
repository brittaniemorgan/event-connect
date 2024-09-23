const express = require('express');
const cors = require('cors');
const app = express();
const eventRoutes = require('./routes/event');
const categoryRoutes = require('./routes/category');
const ticketRoutes = require('./routes/ticket');
const purchasedTicketRoutes = require('./routes/purchasedTicket');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(cors());

app.use('/v1/events', eventRoutes);
app.use('/v1/categories', categoryRoutes);
app.use('/v1/tickets', ticketRoutes);
app.use('/v1/purchased-tickets', purchasedTicketRoutes);
app.use('/v1/reviews', reviewRoutes);
app.use('/v1/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;