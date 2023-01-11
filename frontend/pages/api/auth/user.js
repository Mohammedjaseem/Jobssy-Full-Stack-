import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
   
  if (req.method === "GET") {
    
    const cookies = cookie.parse(req.headers.cookie || "");

    // const refresh = cookies.refresh;
    const access = cookies.access || false;

    if(!access) {
        res.status(401).json({
            message: "Login First to load user",
        });
    }

    try {        
        const response = await axios.get(`${process.env.API_URL}api/me/`,{
            headers: {
                "Authorization": `Bearer ${access}`,
            },
           });

      if(response.data) {
        return res.status(200).json({
          success: true,
          user: response.data,
        });
      } else {
        res.status(response.status).json({
          error: "Authentication Failed",
        });
      }
      
      
    } catch (error) {
        console.log(error)
      res.status(error?.response.status).json({
        error: "Something went wrong while loading user",
      });
    }
  }
}



