const {
  createOrder: paypalCreateOrder,
  captureOrder: paypalCaptureOrder,
} = require("../../helpers/paypal");
const Order = require("../../models/Order");
const Course = require("../../models/Course");
const StudentCourses = require("../../models/StudentCourses");

// Create PayPal order and save local order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
    } = req.body;

    const returnUrl = `${process.env.CLIENT_URL}/payment-return`;
    const cancelUrl = `${process.env.CLIENT_URL}/payment-cancel`;

    // Create PayPal order
    const paymentInfo = await paypalCreateOrder(
      coursePricing.toFixed(2),
      "USD",
      returnUrl,
      cancelUrl
    );

    // Save local order
    const newlyCreatedCourseOrder = new Order({
      userId,
      userName,
      userEmail,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      instructorId,
      instructorName,
      courseImage,
      courseTitle,
      courseId,
      coursePricing,
      paymentId: paymentInfo.id,
    });

    await newlyCreatedCourseOrder.save();

    const approveUrl = paymentInfo.links.find(
      (link) => link.rel === "approve"
    )?.href;

    res.status(201).json({
      success: true,
      data: {
        approveUrl,
        orderId: newlyCreatedCourseOrder._id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error while creating PayPal payment",
    });
  }
};

// Capture payment and finalize order
const capturePaymentAndFinalizeOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    // Capture PayPal payment
    const capturedPayment = await paypalCaptureOrder(order.paymentId);

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    await order.save();

    // Update StudentCourses
    let studentCourses = await StudentCourses.findOne({ userId: order.userId });
    const courseData = {
      courseId: order.courseId,
      title: order.courseTitle,
      instructorId: order.instructorId,
      instructorName: order.instructorName,
      dateOfPurchase: order.orderDate,
      courseImage: order.courseImage,
    };

    if (studentCourses) {
      studentCourses.courses.push(courseData);
      await studentCourses.save();
    } else {
      const newStudentCourses = new StudentCourses({
        userId: order.userId,
        courses: [courseData],
      });
      await newStudentCourses.save();
    }

    // Update Course students
    await Course.findByIdAndUpdate(order.courseId, {
      $addToSet: {
        students: {
          studentId: order.userId,
          studentName: order.userName,
          studentEmail: order.userEmail,
          paidAmount: order.coursePricing,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error while capturing PayPal payment",
    });
  }
};

module.exports = { createOrder, capturePaymentAndFinalizeOrder };
