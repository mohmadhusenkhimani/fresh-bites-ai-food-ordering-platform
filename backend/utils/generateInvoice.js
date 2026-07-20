const PDFDocument = require("pdfkit");

const generateInvoice = (order, res) => {
  const doc = new PDFDocument({
    margin: 50,
    size: "A4",
  });

  // Response Headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Invoice-${order._id}.pdf`
  );

  doc.pipe(res);

  // ===========================
  // HEADER
  // ===========================

  doc
    .fontSize(24)
    .fillColor("#E53935")
    .text("Fresh Bites", { align: "center" });

  doc
    .moveDown(0.2)
    .fontSize(12)
    .fillColor("black")
    .text("Food Ordering Platform", {
      align: "center",
    });

  doc.moveDown();

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown();

  // ===========================
  // INVOICE DETAILS
  // ===========================

  doc.fontSize(16).text("Invoice");

  doc.moveDown(0.5);

  doc.fontSize(11);

  doc.text(`Invoice No : INV-${order._id.toString().slice(-6).toUpperCase()}`);
  doc.text(`Order ID : ${order._id}`);
  doc.text(
    `Order Date : ${new Date(order.createdAt).toLocaleDateString("en-IN")}`
  );

  doc.moveDown();

  // ===========================
  // CUSTOMER DETAILS
  // ===========================

  doc.fontSize(14).text("Customer Details");

  doc.moveDown(0.5);

  doc.fontSize(11);

  doc.text(`Name : ${order.shippingAddress.name}`);
  doc.text(`Email : ${order.shippingAddress.email}`);
  doc.text(`Phone : ${order.shippingAddress.phone}`);
  doc.text(
    `Address : ${order.shippingAddress.city}, ${order.shippingAddress.country} - ${order.shippingAddress.postalCode}`
  );

  doc.moveDown();

  // ===========================
  // ITEMS
  // ===========================

  doc.fontSize(14).text("Ordered Items");

  doc.moveDown();

  order.items.forEach((item) => {
    const total = item.price * item.quantity;

    doc.fontSize(11).text(
      `${item.name}   x${item.quantity}   ₹${item.price}   =   ₹${total}`
    );
  });

  doc.moveDown();

  doc
    .moveTo(50, doc.y)
    .lineTo(550, doc.y)
    .stroke();

  doc.moveDown();

  // ===========================
  // BILL SUMMARY
  // ===========================

  doc.fontSize(14).text("Payment Summary");

  doc.moveDown(0.5);

  doc.fontSize(11);

  doc.text(`Subtotal : ₹${order.subtotal}`);

  doc.text(
    `Coupon : ${
      order.couponCode && order.couponCode !== ""
        ? order.couponCode
        : "No Coupon"
    }`
  );

  doc.text(`Discount : -₹${order.discount || 0}`);

  doc.text(`Shipping : ₹${order.shippingFee}`);

  doc.font("Helvetica-Bold");
  doc.text(`Grand Total : ₹${order.total}`);
  doc.font("Helvetica");

  doc.moveDown();

  // ===========================
  // PAYMENT DETAILS
  // ===========================

  doc.fontSize(14).text("Order Details");

  doc.moveDown(0.5);

  doc.fontSize(11);

  doc.text(`Payment Method : ${order.paymentMethod}`);
  doc.text(`Payment Status : ${order.paymentStatus}`);
  doc.text(`Order Status : ${order.status}`);

  doc.moveDown(2);

  // ===========================
  // FOOTER
  // ===========================

  doc
    .fontSize(13)
    .fillColor("#E53935")
    .text("Thank you for ordering with Fresh Bites ❤️", {
      align: "center",
    });

  doc.end();
};

module.exports = generateInvoice;