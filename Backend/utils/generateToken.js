import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userID, res) => {
  try {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default generateTokenAndSetCookie;
