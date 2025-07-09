// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://myproject-backend-46di.onrender.com", // Міне, дұрыс backend URL
});

export default instance;
