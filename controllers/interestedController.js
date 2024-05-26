import sendEmail from "../utils/sendEmail";

const sendInterestedEmail = async (req, res) => {
  try {
    // Extract the property ID from the request body or parameters
    const propertyId = req.body.propertyId; // Assuming the frontend sends the property ID

    // Retrieve property details from the database based on the property ID
    const propertyDetails = await Property.findById(propertyId); // Example: using Mongoose

    // Extract the seller's email from the property details
    const sellerEmail = propertyDetails.sellerEmail;

    // Extract the buyer's email from the authenticated user (assuming it's stored in the user object)
    const buyerEmail = req.user.email; // Assuming the email is stored in req.user

    // Send email to the seller
    await sendEmail(
      sellerEmail,
      "Interest in your property",
      `A buyer (${buyerEmail}) is interested in your property.`
    );

    // Send email to the buyer
    await sendEmail(
      buyerEmail,
      "Interest in property",
      "Your interest in the property has been noted."
    );

    // Respond with a success message
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Failed to send emails" });
  }
};
