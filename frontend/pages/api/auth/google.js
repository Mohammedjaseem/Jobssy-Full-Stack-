import axios from "axios";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.body;
    

    try {
      const response = await axios.post(
        `${process.env.API_URL}api/google-auth/`,
        {
          token,
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
      );

      if (response.data.access){
        console.log(response.data.access)
        res.setHeader('Set-Cookie', [
            cookie.serialize('access', response.data.access, {
                httpOnly:true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 15,
                sameSite: 'lax',
                path: "/"
                
            })
        ]);

        return res.status(200).json({
          
          success: true,
        });
      } else {
        console.log("else is working")
        res.status(response.status).json({
          error: "Authentication Failed",
        });
      }
    } catch (error) {
      console.log("catch is working")
      console.log(error.response);
      res.status(error.response.status).json({
        error: error.response && error.response.data.error,
      });
    }
  }
};