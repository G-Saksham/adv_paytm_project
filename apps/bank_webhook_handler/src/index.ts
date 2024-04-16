import express from "express";
import prisma from "@payment-exchange/db/client";

const app = express();

app.use(express.json());

app.post("/anybankWebhook", async (req, res) => {

  //first should verify request and came directly by auth... bank
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  // update balance in db (in txn table)

  try {
    // transaction in express
    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentInformation.userId
        },
        data: {
          amount: {
            increment: paymentInformation.amount
          }
        }
      }),
      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token
        },
        data: {
          status: "Success"
        }
      })
    ])
    res.status(200).json({
      message: "captured"
    })
  } catch (e) {
    return res.status(411).json({
      message: "Error from webhook server, Try again later!"
    })
  }

});

app.listen(3002);

export default app;
