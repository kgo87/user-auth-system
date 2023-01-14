import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function VerifyEmail() {
  const [emailVerified, setEmailVerified] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const verifyToken = async () => {
    try 
    {
      toast.loading();
      const response = await axios.post("/api/auth/verifyemail", {
        token: params.token,
      });
      if (response.data.success) 
      {
        setEmailVerified("true");
      } 
      else 
      {
        setEmailVerified("false");
      }
      toast.dismiss();
    } 
    catch (error) 
    {
      toast.dismiss();
      setEmailVerified("false");
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="flex min-h-screen p-5 justify-center items-center">
      {emailVerified == "" && (
        <h1 className="text-primary text-4xl">
          Please wait we are verifying your email
        </h1>
      )}

          {emailVerified == "true" && (
              <div>
                  <h1 className="text-primary text-4xl">
                      Your email verified successfully. Please navigate to LOGIN page.</h1>
                  <button className="border border-primary px-10 py-2 text-primary"
                      onClick={() => 
                        {
                          localStorage.clear();
                          navigate("/login");
                        }}>LOGIN PAGE</button>
              </div>
          )}

      {emailVerified == "false" && (
        <h1 className="text-primary text-4xl">Invalid or Expired Token</h1>
      )}
    </div>
  );
}

export default VerifyEmail;