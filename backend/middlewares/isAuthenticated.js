import jwt from "jsonwebtoken";
 
const isAuthenticated = (req,res,next)=>{
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: "unauthorized user",
                success: false
            })
        }
        const decode= jwt.verify(token, process.env.jwt_Secret);
        if(!decode){
            res.status(401).json({
                message: "invalid user",
                success: false
            })
        }
        req.id= decode.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "internal server error ",
            success:false

        })
    }
}
export default isAuthenticated;