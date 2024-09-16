export const mockEvents = [
  { id: 1, title: "Rock Concert", date: "2024-09-10", location: "Downtown Arena", category: "Music", image: "1.jpeg", organizerId: 6, ticketPrice: 50, status: "Upcoming" },
  { id: 2, title: "Art Exhibition", date: "2024-10-01", location: "City Gallery", category: "Art", image: "2.jpeg", organizerId: 7, ticketPrice: 15, status: "Upcoming" },
  { id: 3, title: "Food Festival", date: "2024-09-22", location: "Central Park", category: "Food & Drink", image: "3.jpeg", organizerId: 6, ticketPrice: 25, status: "Upcoming" },
  { id: 4, title: "Tech Conference", date: "2024-11-05", location: "Convention Center", category: "Technology", organizerId: 7, ticketPrice: 100, status: "Upcoming" },
  { id: 5, title: "Comedy Night", date: "2024-09-30", location: "Laugh Lounge", category: "Theater", organizerId: 6, ticketPrice: 30, status: "Upcoming" },
  { id: 6, title: "Film Screening", date: "2024-10-10", location: "Movie House", category: "Art", organizerId: 7, ticketPrice: 20, status: "Cancelled" },
  { id: 7, title: "Yoga Workshop", date: "2024-09-28", location: "Wellness Studio", category: "Workshops", organizerId: 6, ticketPrice: 40, status: "Sold Out" },
  { id: 8, title: "Charity Run", date: "2024-10-15", location: "City Stadium", category: "Charity", organizerId: 7, ticketPrice: 35, status: "Upcoming" },
];


export const mockCategories = [
  { id: 1, name: "Music" },
  { id: 2, name: "Art" },
  { id: 3, name: "Sports" },
  { id: 4, name: "Food & Drink" },
  { id: 5, name: "Technology" },
  { id: 6, name: "Theater" },
  { id: 7, name: "Workshops" },
  { id: 8, name: "Charity" },
];

export const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", password: "password123", role: "user" },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com", password: "password123", role: "user" },
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", password: "password123", role: "user" },
  { id: 4, name: "Diana Prince", email: "diana.prince@example.com", password: "password123", role: "admin" },
  { id: 5, name: "Evan Williams", email: "evan.williams@example.com", password: "password123", role: "admin" },
  { id: 6, name: "Sophia Lee", email: "sophia.lee@example.com", password: "password123", role: "organizer" },
  { id: 7, name: "James Wilson", email: "james.wilson@example.com", password: "password123", role: "organizer" }
];

export const mockPurchasedTickets = [
  { id: 1, eventId: 1, email: "alice.johnson@example.com", quantity: 2, ticketType: "general", purchaseDate: "2024-08-15T10:30:00Z" },
  { id: 2, eventId: 3, email: "alice.johnson@example.com", quantity: 1, ticketType: "vip", purchaseDate: "2024-08-20T14:45:00Z" },
  { id: 3, eventId: 2, email: "bob.smith@example.com", quantity: 3, ticketType: "general", purchaseDate: "2024-09-01T09:15:00Z" },
  { id: 4, eventId: 5, email: "charlie.brown@example.com", quantity: 2, ticketType: "general", purchaseDate: "2024-09-10T16:20:00Z" },
  { id: 5, eventId: 6, email: "charlie.brown@example.com", quantity: 1, ticketType: "vip", purchaseDate: "2024-09-15T11:00:00Z" },
];

export const mockReviews = [
  {
    eventId: 1,
    email: "alice.johnson@example.com",
    rating: 5,
    text: 'Amazing event! The speakers were fantastic and the organization was top-notch.',
    date: '2024-09-10T14:30:00Z'
  },
  {
    eventId: 1,
    email: "johnB@example.com",
    rating: 3,
    text: "The event was okay, but it didn't meet my expectations. The sessions were a bit too long.",
    date: '2024-09-12T18:00:00Z'
  }
];