import OrderModel from "../models/Order.model.js";
import userModel from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:4000";

  try {
    // Optionally get user ID from auth middleware
    const userId = req.body.userId || req.user?.id;

    // Create new order
    const newOrder = new OrderModel({
      userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create Stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr", // use "aud" if all prices are in AUD
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects paise (for INR)
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100*80, // ₹2.00 in paise
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items:line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const verifyOrder=async (req,res)=>{

  const {orderId,success}=req.body;
  try{
    if(success=="true"){
await OrderModel.findByIdAndUpdate(orderId,{payment:true});
res.json({success:true,message:"paid"});
    }else{
      await OrderModel.findByIdAndUpdate(orderId);
      res.json({success:false,message:"not paid"});
    }
  }catch(err){
    console.log(err);
    res.json({success:false,message:error});
  }
}

export default placeOrder;

