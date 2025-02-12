import React from "react";
// import Link from "next/link";
import PageName from "../components/General/PageName";
import NormalNavBar from "../components/General/NormalNavBar";

const page = () => {
  const faqs = [
    {
      question: "How do we serve food?",
      answer:
        "We serve freshly prepared meals with the highest quality ingredients, ensuring a delicious and satisfying dining experience. Whether you dine in, take out, or order online, we prioritize hygiene and taste in every dish.",
    },
    {
      question: "How is the quality of our food?",
      answer:
        "We take pride in maintaining top-notch food quality by using fresh, locally sourced ingredients and following strict hygiene standards. Every meal is crafted with care to offer you the best taste and nutrition.",
    },
    {
      question: "Do we offer home delivery?",
      answer:
        "Yes! We provide fast and reliable home delivery services. Simply place your order online or through our app, and we'll ensure your food reaches you hot and fresh.",
    },
    {
      question: "How can you get in touch with us?",
      answer:
        "You can contact us via phone, email, or visit our restaurant. Follow us on social media for the latest updates and promotions. We’re always happy to hear from you!",
    },
    {
      question: "What will be delivered and when?",
      answer:
        "Your order will include the exact items you selected, freshly prepared and packed with care. Delivery times vary based on location, but we strive to deliver within 30-45 minutes.",
    },
    {
      question: "Are we open 24/7?",
      answer:
        "Our restaurant operates from [your operating hours], but you can check our website or call us for specific opening hours. We are always here to serve you during our business hours!",
    },
  ];

  return (
    <>
      <div className="bg-gray-100">
        <NormalNavBar />
        <PageName title={"FAQ"} pageName={"faq"} />

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <section className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Here are some of the common questions our customers ask.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border"
                >
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default page;
