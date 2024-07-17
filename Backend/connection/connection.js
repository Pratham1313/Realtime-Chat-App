import mongoose from "mongoose";

export default async function connect_mongo() {
  mongoose
    .connect(process.env.MongoDB_url)
    .then(() => {
      console.log("Connected Database");
    })
    .catch((err) => {
      console.log("err ---> \n", err);
    });
}
