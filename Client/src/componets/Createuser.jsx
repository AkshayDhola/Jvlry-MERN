import  { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { checkoutValidation } from "../utils/validations/Checkout";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    password: "",
    contact: "",
    picture: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      postalCode: ""
    },
    cardNumber: "",
    monthYear: "",
    cvv: ""
  });

  const navigate = useNavigate();

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: formData,
      validationSchema: checkoutValidation,
      onSubmit: async (values) => {
        try {
          const formattedData = {
            ...values,
            contact: values.contact.toString(),
            cardNumber: values.cardNumber.toString(),
            cvv: values.cvv.toString(),
            monthYear: values.monthYear.replace(/\s/g, '')
          };

          const response = await axios.post(
            "http://localhost:3000/api/users/register",
            formattedData,
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
          
          if (response.data && response.data.token) {
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/user");
            setFormData({
              name: "",
              email: "",
              password: "",
              contact: "",
              picture: "",
              billingAddress: {
                street: "",
                city: "",
                state: "", 
                postalCode: ""
              },
              cardNumber: "",
              monthYear: "",
              cvv: ""
            });
          } else {
            console.error("No token received in response");
          }
        } catch (error) {
          console.error("Registration error:", error.response?.data || error.message);
        }
      },
    });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/user");
    }
  }, []);

  return (
    <>
      <div className="w-full h-[89vh] mt-[11vh] px-7 py-7 border-t border-zinc-700/50">
        <div className="w-2/3">
          <h2 className="jm text-lg">Contact Information</h2>
          <div className="flex gap-4 pb-5">

            <div>
              <input
                name="name"
                className={`n ${errors.name && touched.name && "border-[1px] border-red-500"
                  } w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="Enter Name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (<div className="text-red-500">{errors.name}</div>)}
            </div>

            <div>
              <input
                name="email"
                className={`w-[25vw] ${errors.email &&
                  touched.email &&
                  "border-[1px] border-red-500"
                  } px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="Email*"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (<div className="text-red-500">{errors.email}</div>)}
            </div>
          </div>


          <div className="flex gap-4 pb-5">
            <div>
              <input
                name="password"
                className={`w-[25vw] ${errors.password &&
                  touched.password &&
                  "border-[1px] border-red-500"
                  } px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="Password*"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (<div className="text-red-500">{errors.password}</div>)}
            </div>
                  
            <div>
              <input
                name="contact"
                className={`n ${errors.contact &&
                  touched.contact &&
                  "border-[1px] border-red-500"
                  } w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="Enter contact"
                type="text"
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.contact && touched.contact && (<div className="text-red-500">{errors.contact}</div>)}
            </div>

            <div>
              <input
                name="picture"
                className={`n ${errors.picture &&
                  touched.picture &&
                  "border-[1px] border-red-500"
                  } w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="Enter picture"
                type="text"
                value={values.picture}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.picture && touched.picture && (<div className="text-red-500">{errors.picture}</div>)}
            </div>
          </div>

          <h2 className="jm text-lg pb-6">Shipping Address</h2>
          <div className="flex gap-4 pb-5">
            <div>
              <input
                name="billingAddress.street"
                className={`n ${errors.billingAddress?.street &&
                  touched.billingAddress?.street &&
                  "border-[1px] border-red-500"
                  } w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="Street Address*"
                type="text"
                value={values.billingAddress.street}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.billingAddress?.street && touched.billingAddress?.street && (<div className="text-red-500">{errors.billingAddress.street}</div>)}
            </div>
            <div>
              <input
                name="billingAddress.city"
                className={`n w-[25vw] ${errors.billingAddress?.city && touched.billingAddress?.city && "border-[1px] border-red-500"
                  } px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="City*"
                type="text"
                value={values.billingAddress.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.billingAddress?.city && touched.billingAddress?.city && (<div className="text-red-500">{errors.billingAddress.city}</div>)}
            </div>
          </div>
          <div className="flex gap-4 pb-5">
            <div>
              <input
                name="billingAddress.state"
                className={`n ${errors.billingAddress?.state && touched.billingAddress?.state && "border-[1px] border-red-500"
                  } w-[25vw] px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="State*"
                type="text"
                value={values.billingAddress.state}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.billingAddress?.state && touched.billingAddress?.state && (<div className="text-red-500">{errors.billingAddress.state}</div>)}
            </div>
            <div>
              <input
                name="billingAddress.postalCode"
                className={`n w-[25vw] ${errors.billingAddress?.postalCode && touched.billingAddress?.postalCode && "border-[1px] border-red-500"
                  } px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="Zip*"
                type="text"
                value={values.billingAddress.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.billingAddress?.postalCode && touched.billingAddress?.postalCode && (
                <div className="text-red-500">{errors.billingAddress.postalCode}</div>)}</div>
          </div>
          <h2 className="jm text-lg pb-6">Payment Information</h2>
          <div className="flex gap-4 pb-5">
            <div>
              <input
                name="cardNumber"
                className={`n w-[25vw] ${errors.cardNumber &&
                  touched.cardNumber &&
                  "border-[1px] border-red-500"
                  } px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="Card Number*"
                type="text"
                value={values.cardNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cardNumber && touched.cardNumber && (<div className="text-red-500">{errors.cardNumber}</div>)}
            </div>
            <div>
              <input
                name="monthYear"
                className={`n w-[12.5vw] ${errors.monthYear &&
                  touched.monthYear &&
                  "border-[1px] border-red-500"
                  } px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="MM/YYYY"
                type="text"
                value={values.monthYear}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.monthYear && touched.monthYear && (<div className="text-red-500">{errors.monthYear}</div>)}
            </div>
            <div>
              <input
                id="cvv"
                name="cvv"
                className={`n w-[12.5vw] ${errors.cvv && touched.cvv && "border-[1px] border-red-500"
                  } px-3 py-2 text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50`}
                placeholder="CVV"
                type="text"
                value={values.cvv}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.cvv && touched.cvv && (<div className="text-red-500">{errors.cvv}</div>)}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="n w-[25vw] px-3 py-2 bg-black text-white text-[1vw] border border-zinc-700/50 rounded-md outline-zinc-950/50"
            type="submit"
          >Register</button>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
