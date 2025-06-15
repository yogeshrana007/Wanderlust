
# 🌍 Wanderlust

**Wanderlust** is a full-stack travel destination sharing application where users can discover, list, and review scenic locations around the world. Built with the **MERN stack** technologies and enhanced with cloud services and map APIs, Wanderlust provides a seamless platform for travel enthusiasts to connect and share their adventures.

🔗 **Live Demo**: [https://wanderlust-wmee.onrender.com/listings](https://wanderlust-wmee.onrender.com/listings)


## ✨ Features

* 🔐 User Authentication (Register, Login, Logout)
* 📌 Add and manage travel destination listings
* 💬 Write and manage reviews for listings
* 📍 Interactive maps using **Mapbox**
* 📸 Image uploads powered by **Cloudinary**
* 🔒 Security with **Helmet**, **Mongo sanitize**, etc.
* 📱 Responsive design with **Bootstrap**

---

## 🛠️ Tech Stack

* **Frontend**: EJS, Bootstrap, HTML/CSS
* **Backend**: Node.js, Express
* **Database**: MongoDB & Mongoose
* **Authentication**: Passport.js
* **Image Hosting**: Cloudinary
* **Map Integration**: Mapbox API
* **Deployment**: Render

---

## 🚀 Getting Started Locally

### Prerequisites

* Node.js & npm
* MongoDB (Local or Atlas)

### Installation

```bash
git clone https://github.com/yogeshrana007/Wanderlust.git
cd Wanderlust
npm install
```

### Environment Setup

Create a `.env` file in the root with the following variables:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongodb_connection_string
SECRET=session_secret_key
```

### Run the Server

```bash
npm start
```

Visit `http://localhost:3000` in your browser.

---

## 🧾 Folder Structure

```
Wanderlust/
├── models/           # Mongoose schemas
├── routes/           # Express route files
├── views/            # EJS templates
├── public/           # Static assets (CSS, JS, Images)
├── controllers/      # Logic for routes
├── utils/            # Error handling and middleware
├── app.js            # Main server file
```



## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

