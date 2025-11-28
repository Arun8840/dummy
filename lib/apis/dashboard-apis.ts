import axios from "axios"

export const verifyUser = async (credentials: {
  email: string
  token: string
}) => {
  try {
    const res = await axios.post(
      "https://skyapp.aadhavan.com/api/user/v1/verifyemail",
      credentials
    )
    return res.data
  } catch (err) {
    console.error("Verify API fetch error:", err)
    return null
  }
}
