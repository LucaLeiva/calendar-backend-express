import mongoose from "mongoose";

export const dbConnection = async() => {
  try {
    
    await mongoose.connect("mongodb+srv://luca:USSDefiantNCC-75633@calendardb.getlonl.mongodb.net/calendarDB");

    console.log("DB Online");

  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la DB");
  }
}